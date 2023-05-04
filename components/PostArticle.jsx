import {ArrowUpIcon} from '@heroicons/react/24/outline'
import {ArrowDownIcon} from '@heroicons/react/24/outline'
import {ChatBubbleOvalLeftEllipsisIcon} from '@heroicons/react/24/outline'
import {EllipsisHorizontalIcon} from '@heroicons/react/24/outline'
import {GiftIcon} from '@heroicons/react/24/outline'
import {ShareIcon} from '@heroicons/react/24/outline'
import {BookmarkIcon} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Avatar from './Avatar'
import Moment from 'react-moment';
import { useRouter } from 'next/router'
import Link from 'next/link'
import {Jelly} from '@uiball/loaders'
import { useAuth } from '@/contexts/Auth'
import { toast } from 'react-hot-toast'



const PostArticle = ({id,title,body,image,subreddit_id,username,created_at,commentNum}) => {
    const [subreddit, setSubreddit] = useState(null)
    const [comments, setComments] = useState(null)
    const {user} = useAuth()
    const [votes, setVotes] = useState(null)
    const [vote,setVote] = useState()

    useEffect(()=>{
const fetchSubreddit = async(id)=>{

    const { data, error } = await supabase
  .from('subreddit')
  .select('*')
  .eq('id', id)
  .single();

if (error) {
  console.log('Error fetching post:', error.message);
} else {
//   console.log('Post fetched:', data);
  setSubreddit(data)
}
}

const fetchComments = async (id)=>{
    const { data, error } = await supabase
    .from('comment')
    .select('*')
    .eq('post_id', id)
   
  
  if (error) {
    console.log('Error fetching post:', error.message);
  } else {
  //   console.log('Post fetched:', data);
    setComments(data)
  }
}


const fetchVotes = async(id)=>{
  const { data: vote, error } = await supabase
  .from('vote')
  .select('*')
  .eq('post_id', id)
  .order('created_at', { ascending: false })

  setVotes(vote)


}



fetchSubreddit(subreddit_id)
fetchComments(id)
fetchVotes(id)


const channel3 = supabase
.channel('table-db-changes')
.on(
  'postgres_changes',
  {
    event: '*',
    schema: 'public',
    table: 'vote',
  },
  (payload) => { 
      

      setVotes(votes=>  [payload.new,...votes]) }
)
.subscribe()


    },[])

useEffect(()=>{

const theVote = votes?.find((el)=>el.username === user?.name)?.upvote
setVote(theVote)




},[votes,user])







    const router = useRouter()


    const voting = async (isVoting)=>{
  
      if(!user)
      {toast.error('please sign in to vote')}
    else  
    {  if(vote && isVoting )
     return
     else if(vote === false && !isVoting)
     return

     else{ const { data: insertedVote, error } = await supabase
      .from('vote')
      .insert({
        username: user?.name,
        upvote: isVoting,
        post_id: id
      })
     
    }}

      
      
      }



      const displayNumber = (votes)=>{
        const number = votes?.reduce((total,el)=>el.upvote? total+=1 : total-=1,0)
if(votes?.length===0)
return 0
else if(number===0)
return votes[0].upvote ? 1 : -1
else
return number


      }


    if(!subreddit || !id)
    return<div className='flex w-full justify-center items-center h-[250px]'>
      <Jelly size={80}  color='#ff4501'/>
    </div>
  return (
    <Link href={`/post/${id}`}>
    <article className='bg-white flex rounded-md cursor-pointer border  border-gray-300 shadow-sm hover:border-gray-600'>
        

        <section className='bg-gray-50 rounded-l-md flex flex-col items-center justify-start p-4 text-gray-400   space-y-1'>
       
        <ArrowUpIcon onClick={(e)=>voting(true)} className={`iconButton hover:text-red-400 ${vote && 'text-red-400'}`}/>
<p className='font-bold text-black text-xs'>{displayNumber(votes)}</p>
<ArrowDownIcon onClick={(e)=>voting(false)} className={`iconButton hover:text-blue-400 ${vote ===false && 'text-blue-400'}`}/>
      
        </section>
        <section className='p-3 pb-1 flex-1 overflow-hidden'>
            <div className='flex items-center gap-1'>
          {subreddit&&  <Avatar seed={subreddit?.topic} />}
{subreddit&& <p   className='text-gray-400 text-xs flex-1 w- '><Link href={`/subreddit/${subreddit?.topic}`}><span  className='text-black font-bold hover:text-blue-400 hover:underline'>r/{subreddit.topic}</span></Link>. Posted by u/{username}<Moment fromNow date={created_at} /></p>}
</div>
<div className='p-4'>
    <h1 className='text-xl font-bold'>{title}</h1>
    <p className='text-gray-400 text-xs mt-2'>{body}</p>
</div>
{image &&<img className='w-full mb-1' src={image} />}


<div className='flex gap-4 w-full'>
    <div className='iconBox'>
        <ChatBubbleOvalLeftEllipsisIcon className='icon' />
        <p>{commentNum ? commentNum :comments&&comments.length}  Comments</p>
    </div>
    <div className='iconBox'>
        <GiftIcon className='icon' />
        <p className='hidden sm:block'>  Award</p>
    </div>
    <div className='iconBox'>
        <ShareIcon className='icon' />
        <p className='hidden sm:block'>  Share</p>
    </div>
    <div className='iconBox'>
        <BookmarkIcon className='icon' />
        <p className='hidden sm:block'> Save</p>
    </div>
    <div className='iconBox'>
        <EllipsisHorizontalIcon className='icon' />
      
    </div>
</div>
        </section>
    </article>
    </Link>
  )
}

export default PostArticle