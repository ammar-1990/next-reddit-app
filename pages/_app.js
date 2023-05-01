import Header from '@/components/Header'
import AuthContextProvider from '@/contexts/Auth'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return  <AuthContextProvider>
    <div className='h-screen bg-slate-200'>
      <Header />
    <Component {...pageProps} />
    </div>
    </AuthContextProvider>
}
