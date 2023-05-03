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



const PostArticle = ({id,title,body,image,subreddit_id,username,created_at,commentNum}) => {
    const [subreddit, setSubreddit] = useState(null)
    const [comments, setComments] = useState(null)

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

fetchSubreddit(subreddit_id)
fetchComments(id)



    },[])

    const router = useRouter()


    if(!subreddit || !id)
    return<div className='flex w-full justify-center items-center h-[250px]'>
      <Jelly size={80}  color='#ff4501'/>
    </div>
  return (
    <Link href={`/post/${id}`}>
    <article className='bg-white flex rounded-md cursor-pointer border  border-gray-300 shadow-sm hover:border-gray-600'>
        

        <section className='bg-gray-50 rounded-l-md flex flex-col items-center justify-start p-4 text-gray-400   space-y-1'>
       
        <ArrowUpIcon className='iconButton hover:text-red-400'/>
<p className='font-bold text-black text-xs'>0</p>
<ArrowDownIcon className='iconButton hover:text-blue-400'/>
      
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