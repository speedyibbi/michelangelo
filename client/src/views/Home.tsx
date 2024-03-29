import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Game, Quote } from '../utilities/interfaces'
import { quotes } from '../utilities/static'

const Home = (): ReactElement => {
  const [game, setGame] = useState<Game>()
  const [quote, setQuote] = useState<Quote>()

  useEffect(() => {
    const getGame = async (): Promise<void> => {
      const game = await fetch('/games/', { method: 'GET' })
        .then(async (res) => await res.json())
      setGame(game[0])
    }
    void getGame()
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <article className='h-full grid grid-cols-2 overflow-hidden'>
      <div className='h-full hidden md:flex flex-col justify-center'>
        <div className='h-2/6 bg-contain bg-center bg-gif_home bg-no-repeat' />
        <div className='group h-3/6 lg:h-4/6 mx-10 lg:mx-16 mb-7 relative border-2 bg-neutral-900 rounded-sm overflow-hidden'>
          <Link to={game !== undefined ? `/games/${game.title}` : ''}
          className='w-full h-full p-6 absolute flex items-end bg-neutral-900 bg-opacity-30 z-10'>
            <p className='font-caviar text-special text-4xl text-shadow-custom glowingText-special'>
              Featured</p>
          </Link>
          <img src={game !== undefined ? game.image : ''} alt=''
          className='group-hover:scale-125 w-full h-full transition-all z-0' />
        </div>
      </div>
      <p className='w-3/4 h-11/12 m-auto col-span-2 md:col-span-1 font-caviar
      text-white text-2xl text-center text-shadow-custom'>
        &quot;{ quote?.body }&quot; <br /> - { quote?.game }<br />
        <Link to='/games'>
          <button className='m-5 p-3 relative font-squids text-primary text-lg rounded-md
          box-shadow-custom bg-stone-800 border-2 border-primary transition-all
          hover:text-stone-800 hover:bg-primary hover:scale-110'>Explore Games</button>
        </Link>
      </p>
    </article>
  )
}

export default Home
