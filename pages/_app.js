import Header from '@/components/Header'
import AuthContextProvider from '@/contexts/Auth'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
  return  <div className=' bg-gray-100 h-screen overflow-y-scroll'><AuthContextProvider>
      <Toaster />
 
      <Header />
    <Component {...pageProps} />
    
    </AuthContextProvider></div>
}
