
import { Inter } from 'next/font/google'
import { supabase } from '@/lib/supabaseClient'
import Head from 'next/head'
import  {ChevronUpIcon} from '@heroicons/react/24/outline'

import Post from '@/components/Post'
import Feed from '@/components/Feed'
import { useEffect ,useState} from 'react'
import Avatar from '@/components/Avatar'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
const [subreddit, setSubreddit] = useState(null)

useEffect(()=>{

  const fetchSubreddit = async()=>{
    const { data: subreddit, error } = await supabase
    .from("subreddit")
    .select("*")
    setSubreddit(subreddit)
  }
  fetchSubreddit()
 


},[])




  return (
  <div className='my-7 max-w-5xl mx-auto'>
    <Head>
      <title>
        Reddit App
      </title>
    </Head>
<Post />

<div className='flex gap-5'>
  <Feed  />
  <div className=' hidden lg:block min-w-[300px] mt-5   '>
    {subreddit?.length>0&&<div className='sticky top-40 bg-white  border'>
    <p className='text-md font-bold p-4'>Top Communities</p>
    <div className='mt-5'>
      {subreddit?.slice(0,4).map((el,i)=><div key={el.id} className='p-3 flex items-center border border-l-0 border-b-0 border-r-0 '>
<span className='flex items-center gap-1'><span>{i+1}</span> <ChevronUpIcon className='h-5 text-gray-400' /> </span>
<span className='flex items-center gap-2 flex-1'>
  <Avatar seed={el.topic} />
  <span className='text-gray-500 text-sm'>{el.topic}</span>
</span>
<Link href={`/subreddit/${el.topic}`}><button className='font-semibold text-white bg-blue-600 rounded-full px-3'>View</button></Link>


      </div>)}
    </div>
    </div>}



  </div>
</div>

  </div>
  )
}



