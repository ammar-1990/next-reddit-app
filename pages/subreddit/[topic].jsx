import Avatar from "@/components/Avatar"
import Feed from "@/components/Feed"
import Post from "@/components/Post"
import { useRouter } from "next/router"

const subreddit = () => {

    const {query:{topic}} = useRouter()

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

    <div className="mt-5 max-w-5xl mx-auto">
        <Post mySubreddit={topic}/>
        <Feed />
    </div>
</div>

    </div>
  )
}

export default subreddit