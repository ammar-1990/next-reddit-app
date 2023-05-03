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

        const channel = supabase
          .channel('table-db-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'post',
            },
            (payload) => { 
                
                
                setPosts(posts=>!theId ? [payload.new,...posts] :  [payload.new,...posts].filter(el=>el.subreddit_id === theId)) }
          )
          .subscribe()
        
        
        
        },[])


if(theId==='') 
return <div>no such subreddit</div>
      
  return (
    <div className='mt-5 space-y-4 max-w-screen overflow-hidden '>

{posts?.map(el=><PostArticle key={el.id} {...el} />)}


    </div>
  )
}

export default Feed