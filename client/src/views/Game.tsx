import React, { ReactElement, useEffect, useState } from 'react'
import UnityEngine from '../components/UnityEngine'
import { useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const Game = (): ReactElement => {
  const { title } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState<{ title?: string, description?: string, creator?: string }>({})

  const goBack = (): void => {
    navigate(-1)
  }

  useEffect(() => {
    const getGame = async (): Promise<void> => {
      setGame(await fetch(`/game/info?title=${title !== undefined ? title : ''}`, { method: 'GET' })
        .then(async (res) => await res.json()))
    }
    void getGame()
  }, [])

  return (
    <div className='w-11/12 h-full m-auto relative flex justify-between items-center'>
      <div className='w-1/3 h-5/6'>
        <div className='w-full h-1/6 flex justify-start items-center'>
          <button onClick={goBack} className='my-3 flex items-center
          font-squids text-white text-xl text-deep-shadow-custom box-shadow-custom
          border-2 border-white rounded-md transition-all hover:text-secondary hover:border-secondary'>
            <FontAwesomeIcon icon={faChevronLeft} className='ml-3' />
            <p className='m-3'>return</p></button>
          <div className={`w-full h-full bg-contain bg-center
          bg-gif_game_${Math.floor(Math.random() * 2) + 1} bg-no-repeat`} />
        </div>
        <div className='w-full h-5/6 py-4 flex flex-col justify-between items-start
        font-caviar text-secondary text-xl text-shadow-custom
        border-2 border-white rounded-sm bg-neutral-900 box-shadow-custom'>
          <div>
            <p className='my-3 px-5'><span className='text-white'>Title - </span>{game.title}</p>
            <p className='my-3 px-5'><span className='text-white'>Description - </span>{game.description}</p>
          </div>
          <div>
            <p className='my-3 px-5'><span className='text-white'>Created by </span>{game.creator}</p>
          </div>
        </div>
      </div>
      <div className='w-7/12 aspect-video relative border-2 bg-neutral-900
      rounded-sm overflow-hidden box-shadow-custom'>
          <UnityEngine />
      </div>
    </div>
  )
}

export default Game
