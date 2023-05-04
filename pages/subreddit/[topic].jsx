import Avatar from "@/components/Avatar"
import Feed from "@/components/Feed"
import Post from "@/components/Post"
import { useRouter } from "next/router"
import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

const subreddit = ({id}) => {

    const {query:{topic}} = useRouter()

console.log(id)

  return (
    <div>
<div>
    <div className="bg-red-400 h-24"></div>
    <div className=" bg-white h-24">
    <div className="p-4 flex gap-1 items-center mx-auto max-w-5xl">
        <div className="-mt-10"><Avatar large seed={topic}  /></div>
        <div>
            <h1 className="text-3xl font-semibold">Welcome to the r/{topic} subreddit</h1>
            <p className="text-sm text-gray-400">r/{topic}</p>
        </div>
    </div>
    </div>
    </div>
    <div className="mt-5 max-w-5xl mx-auto pb-5">
        <Post mySubreddit={topic}/>
        <Feed theId={id} />
    </div>


    </div>
  )
}

export default subreddit


export async function getServerSideProps({params:{topic}}){
console.log(topic)

const { data, error } = await supabase
  .from('subreddit')
  .select('*')
  .eq('topic',topic)
  .single()

  if(!data)
  return {props:{
    id:''
  }}


  const { data:post, error:postError } = await supabase
  .from('post')
  .select('*')
  .eq('subreddit_id',data.id)






    return {
        props:{id:data.id}
    }
}