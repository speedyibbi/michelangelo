import React, { ReactElement, useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { quoteInterface } from '../utilities/interfaces'
import { quotes } from '../utilities/static'

const Home = (): ReactElement => {
  const [quote, setQuote] = useState<quoteInterface>()
  const navbarSpring = useSpring({ from: { y: -500 }, y: 0 })
  const footerSpring = useSpring({ from: { y: 500 }, y: 0 })
  const fadeInSpring = useSpring({ from: { opacity: 0 }, opacity: 1 })

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <section className='h-full home-grid-custom overflow-hidden'>
      <animated.span style={navbarSpring}><Nav /></animated.span>
      <animated.article style={fadeInSpring} className='h-full grid grid-cols-2'>
        <div className='grid grid-rows-3'>
          <div className='row-span-1 col-span-1 bg-contain bg-center bg-gif bg-no-repeat' />
          <div className='mx-7 row-start-2 row-end-4 col-span-1 border-2 bg-neutral-900 rounded-sm'>
            {/* unity game */}
          </div>
        </div>
        <p className='w-3/4 h-11/12 m-auto col-span-1 font-caviar
        text-white text-2xl text-center text-shadow-custom'>
          &quot;{ quote?.body }&quot; <br /> - { quote?.game }<br />
          <button className='m-5 p-3 relative font-squids text-primary text-lg rounded-md
          box-shadow-custom bg-stone-800 border-2 border-primary transition-all
          hover:text-stone-800 hover:bg-primary hover:scale-110'>Explore Games</button>
        </p>
      </animated.article>
      <animated.span style={footerSpring}><Footer /></animated.span>
    </section>
  )
}

export default Home
