
import { Inter } from 'next/font/google'

import Head from 'next/head'


import Post from '@/components/Post'
import Feed from '@/components/Feed'


const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {





  return (
  <div className='my-7 max-w-5xl mx-auto'>
    <Head>
      <title>
        Reddit App
      </title>
    </Head>
<Post />

<div className='felx'>
  <Feed  />
</div>

  </div>
  )
}



