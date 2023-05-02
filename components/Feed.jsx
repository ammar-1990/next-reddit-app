import React from 'react'
import PostArticle from './PostArticle'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const Feed = () => {
    const [posts,setPosts]=useState([])

    useEffect(()=>{

  const fetchPosts = async ()=>{
    const { data, error } = await supabase
    .from('post')
    .select().order('created_at', { ascending: false })
    setPosts(data)
  }

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
            (payload) => {setPosts(posts=>[payload.new,...posts]) }
          )
          .subscribe()
        
        
        
        },[])
  return (
    <div className='mt-5 space-y-4 max-w-screen overflow-hidden '>

{posts?.map(el=><PostArticle key={el.id} {...el} />)}


    </div>
  )
}

export default Feed