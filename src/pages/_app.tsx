import '@/styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    })
  }, [])

  return (
    <>
      <Head>
        <title>National No-Ads Day - September 15th</title>
        <meta name="description" content="Join National No-Ads Day on September 15th and experience a day without advertising distractions." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
