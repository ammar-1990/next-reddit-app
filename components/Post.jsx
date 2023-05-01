import { useAuth } from "@/contexts/Auth";
import Avatar from "./Avatar";
import {PhotoIcon} from '@heroicons/react/24/outline'
import {LinkIcon} from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form";
import { useState } from "react";



useAuth;

const Post = () => {
  const { user } = useAuth();
  const { register, handleSubmit, watch, setValue,formState: { errors } } = useForm();
  const [image, setImage] = useState(false)
  const onSubmit = handleSubmit(async(data)=>{
console.log(data)
  })
  return (
    <form onSubmit={onSubmit} className="sticky top-16 z-50 bg-white p-2 border border-x-gray-300 rounded-md">
      <div className="flex items-center gap-3 w-full">
        <Avatar />
        <input
        {...register('postTitle',{required:'A Post Title is required'})}
          type="text"
          placeholder={
            user
              ? "Create a post buy entering a title"
              : "Sign in to create a post"
          }
          disabled={!user}
          className="flex-1  outline-none rounded-md bg-gray-50 p-2 px-4"
        />
        <PhotoIcon onClick={()=>{!!watch('postTitle') ? setImage(val=>!val) :setImage(false) }} className={`h-6 cursor-pointer text-gray-400 ${image && 'text-blue-200'}`} />
        <LinkIcon className="icon" />
      </div>

      {watch('postTitle')&&<div className="flex flex-col py-2">
        <div className="flex items-center m-2">
            <p className="min-w-[90px]">Body:</p>
            <input type="text" className="bg-blue-50 flex-1 outline-none py-2 px-2" {...register('postBody')} placeholder="Text (Optional)"/>
        </div>
        <div className="flex items-center m-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input type="text" className="bg-blue-50 flex-1 outline-none py-2 px-2" {...register('subreddit',{required:'A Subreddit is required'})} placeholder="i.e. Nextjs"/>
        </div>
        {image&& <div className="flex items-center m-2">
            <p className="min-w-[90px]">Image URL:</p>
            <input type="text" className="bg-blue-50 flex-1 outline-none py-2 px-2" {...register('postImage')} placeholder="Optional"/>
        </div>}
{Object.keys(errors).length > 0 && <div className="space-y-2 p-2 text-red-500">
   {errors.postTitle && <p>{errors.postTitle.message}</p>}
   {errors.subreddit && <p>{errors.subreddit.message}</p>}
    
    </div>}
<button className="text-white bg-blue-400 rounded-full py-2">Create Post</button>
      </div> }
    </form>
  );
};

export default Post;
