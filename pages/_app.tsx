import '../styles/globals.css'
import type {AppProps} from "next/app";
import Layout from "../components/Layout";
import Nav from '../components/Nav';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Nav />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </>
  )
}

export default MyApp
