import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Calendar from '@/components/Calendar/Calendar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Calendar</title>
        <meta name="description" content="A simple and intuitive calendar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-screen h-screen flex flex-col justify-center align-middle bg-gradient-to-tl from-blue-400 to-purple-400'>
        <div className='xs:w-[90%] md:w-[80%] lg:w-[70%] mx-auto'>
          <Calendar/>
        </div>
        
      </main>
    </>
  )
}
