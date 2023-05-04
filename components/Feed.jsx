import React from 'react'
import PostArticle from './PostArticle'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'
import subreddit from '@/pages/subreddit/[topic]'

const Feed = ({theId}) => {

    const [posts,setPosts]=useState([])
   

    const fetchPosts = async ()=>{

     
            
        const { data, error } = await supabase
        .from('post')
        .select().order('created_at', { ascending: false })
        setPosts(!theId ? data : data.filter(el=>el.subreddit_id === theId))
        
      
     
    
    
    
    }



useEffect(()=>{
      




  fetchPosts()

     
        
        
        
        },[])



        useEffect(()=>{

          const channel1 = supabase
          .channel('table-db-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'post',
            },
            (payload) => { 
                console.log(payload)
                
                setPosts(posts=>!theId ? [payload.new,...posts] :  [payload.new,...posts].filter(el=>el.subreddit_id === theId)) }
          )
          .subscribe()


        },[])


if(theId==='') 
return <div>no such subreddit</div>
      
  return (
    <div className='mt-5 flex flex-col gap-5 max-w-screen overflow-hidden flex-1'>

{posts?.map(el=><PostArticle key={el.id} {...el} />)}


    </div>
  )
}

export default Feed