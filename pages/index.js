
import { Inter } from 'next/font/google'

import Head from 'next/head'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Post from '@/components/Post'

const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {

console.log(data)

  return (
  <div className='my-7 max-w-5xl mx-auto'>
    <Head>
      <title>
        Reddit App
      </title>
    </Head>
<Post />
  </div>
  )
}



export async function  getServerSideProps(){





 const { data, error } = await supabase
  .from('subreddit')
  .select()



  return {
    props: {
     data
    },
  }

}