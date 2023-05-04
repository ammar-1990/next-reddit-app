import PostArticle from "@/components/PostArticle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/contexts/Auth";
import { useForm } from "react-hook-form";
import  {Jelly}  from '@uiball/loaders'
import { toast } from "react-hot-toast";
import Avatar from "@/components/Avatar";
import Moment from "react-moment";

const post = ({ id }) => {
  const [post, setPost] = useState(null);
  const [comments,setComments]=useState(null)


  const {user} = useAuth()

  useEffect(() => {
    const fetchAll = async () => {
      const { data, error } = await supabase
        .from("post")
        .select("*")
        .eq("id", id)
        .single();

  
      setPost(data);


      const { data: comment, error:commetsError } = await supabase
  .from('comment')
  .select('*')
  .eq('post_id',id)
  .order('created_at', { ascending: false })


console.log(comment)
  setComments(comment)
    };

    fetchAll();


  




  }, []);



  useEffect(()=>{

    const channel2 = supabase
    .channel('table-db-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'comment',
      },
      (payload) => { 
        console.log(payload)
          
          setComments(comments=>[payload.new,...comments]) 
       }
    )
    .subscribe()
  },[])


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();




const onSubmit = async(data)=>{
  const notification = toast.loading('Posting your comment')
try{
 
  const { data: comment, error } = await supabase
  .from('comment')
  .insert({
    username:user.name,
   text:data.comment,
    post_id: id
  })

setValue('comment','')
 toast.success('Comment was posted',{id:notification})
}
catch(err){

  toast.error("Something went wrong", { id: notification });
  setValue('comment','')
  console.log(err)
}


}







 if(!comments) 
 return <div className="flex  items-center justify-center h-[350px]"><Jelly size={80}  color='#ff4501' /></div>
    return (
      <div className="mt-7 max-w-5xl mx-auto p-4 pb-10 ">
        <div className=" border border-gray-300 shadow-sm hover:border-gray-600 rounded-md">
        <PostArticle {...post}  commentNum={comments.length} />
        {post&&<div className="border  border-t-0 p-8 pb-0 -mt-2 bg-white pl-20 rounded-b-md ">

         <p className="text-gray-700 font-semibold text-lg">Comment as <span className="text-red-500">{user?.name}</span></p>
         <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col ">
          <textarea {...register("comment", { required: "A comment is required" })} disabled={!user} className="h-40 border p-4 resize-none outline-none disabled:opacity-60 " placeholder={user?'What are your thoughts' : 'Please log in to comment '}></textarea>
          {errors.comment && <p className="py-4 text-red-500">{errors.comment.message}</p>}
          <button disabled={!user} className="p-3 text-white bg-red-500 rounded-full disabled:opacity-60 mt-2">COMMENT</button>
         </form>


         <div className="mt-8  ">
{comments?.map(el=><div key={el.id} className="flex gap-2 relative items-center mb-10">
  <hr className="h-10 border absolute -bottom-10 left-6"/>
<Avatar seed={el.username} />
<div className="">
  <p className="text-gray-600">{el.username} <Moment className="text-gray-400 text-xs pl-2"  fromNow date={el.created_at} /></p>

  <p>{el.text}</p>
</div>

</div>)}

         </div>
        </div>}
        </div>
      
      </div>
    );
};

export default post;

export async function getServerSideProps({ params }) {
  const { id } = params;

  return {
    props: { id },
  };
}
