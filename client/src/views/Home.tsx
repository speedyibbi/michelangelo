import React, { ReactElement, useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { quoteInterface } from '../utilities/interfaces'
import { quotes } from '../utilities/static'

const Home = (): ReactElement => {
  const [quote, setQuote] = useState<quoteInterface>()

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <section className='h-full home-grid-custom overflow-x-hidden'>
      <Nav />
      <article className='h-full grid'>
        <p className='w-3/4 h-11/12 m-auto col-span-1 font-caviar
        text-white text-2xl text-center text-shadow-custom'>
            &quot;{ quote?.body }&quot; <br /> - { quote?.game }
            <br />
            <a href="https://www.igdb.com/api" target={'_blank'} rel="noreferrer"
            className='font-squids text-secondary underline remove-shadows-custom'>
                powered by <span className='text-amber-500'>IGDB</span>
            </a>
            <br />
            <button
            className='m-5 p-3 relative font-squids text-stone-800 text-lg rounded-md
            box-shadow-custom bg-primary transition-all
            hover:scale-110 hover:animate-none'>
              Explore Games</button>
        </p>
      </article>
      <Footer />
    </section>
  )
}

export default Home
