import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Explore = (): ReactElement => {
  const [games, setGames] = useState<[{ id?: string, title?: string, description?: string }]>([{}])

  const getGames = async (offset: number, limit: number): Promise<void> => {
    setGames(await fetch(`/games?offset=${offset}&limit=${limit}`, { method: 'GET' })
      .then(async (res) => await res.json()).catch(() => [...games]))
  }

  useEffect(() => { void getGames(0, 100); console.log(games) }, [])

  return (
    <ul className='w-full min-h-full mx-auto px-4 sm:px-14 py-10 grid auto-rows-13 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {games.map((game) => {
        return (
          <li key={game.id} className='group m-3 relative border-2 border-white
          rounded-md overflow-hidden'>
            <Link to={`/games/${String(game.title)}`}
            className='w-full h-full p-6 absolute flex items-end
            bg-neutral-900 bg-opacity-30 z-10'>
              <p className='font-caviar text-secondary text-2xl text-shadow-custom glowingText-secondary'>
                {game.title}</p>
            </Link>
            <img src={`/games/image?title=${String(game.title)}`} alt=''
            className='group-hover:scale-110 w-full h-full transition-all z-0'/>
          </li>
        )
      })}
    </ul>
  )
}

export default Explore
