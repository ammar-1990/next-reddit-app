import Header from '@/components/Header'
import AuthContextProvider from '@/contexts/Auth'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return  <AuthContextProvider>
    <div className='h-screen bg-slate-200'>
      <Toaster />
      <Header />
    <Component {...pageProps} />
    </div>
    </AuthContextProvider>
}
