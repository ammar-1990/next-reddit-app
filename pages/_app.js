import AuthContextProvider from '@/contexts/Auth'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return  <AuthContextProvider><Component {...pageProps} /></AuthContextProvider>
}
