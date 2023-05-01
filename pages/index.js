import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <div >
    <Head>
      <title>
        Reddit App
      </title>
    </Head>

  </div>
  )
}
