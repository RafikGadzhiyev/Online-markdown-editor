import type { NextPage } from 'next'
import Head from 'next/head'
import { MainNavigation } from '../assets/components/MainNavigation'
import { MarkDown } from '../assets/components/Markdown'

const Home: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Online Markdown editor</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainNavigation />

      <MarkDown />

    </div>
  )
}

export default Home
