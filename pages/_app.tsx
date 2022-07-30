import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { store } from '../assets/redux/store'


function MyApp({ Component, pageProps }: AppProps) {
  return <Provider
    store={store}
  >
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
