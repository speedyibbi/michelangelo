import React, { ReactElement, useContext, useEffect, useState } from 'react'
import UnityEngine from '../components/UnityEngine'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { ViewContext } from '../Views'

const Game = (): ReactElement => {
  const navigate = useNavigate()
  const { title } = useParams()
  const { setFlash } = useContext(ViewContext)
  const [game, setGame] =
  useState<{ title?: string, description?: string, creator?: string }>({})

  const goBack = (): void => {
    navigate(-1)
  }

  useEffect(() => {
    const getGameInfo = async (): Promise<void> => {
      await fetch(`/games/info?title=${title !== undefined ? title : ''}`, { method: 'GET' })
        .then(async (res) => await res.json())
        .then((response) => setGame(response))
        .catch(() => {
          navigate('/')
          setFlash({ type: 'error', text: 'Could not find game' })
        })
    }
    void getGameInfo()
  }, [])

  return (
    <div className='w-full h-full m-auto py-10 relative flex flex-col sm:flex-row justify-around sm:justify-between items-center'>
      <div className='w-4/12 h-full m-auto hidden lg:block'>
        <div className='w-full h-1/6 flex justify-start items-center'>
          <button onClick={goBack} className='my-3 flex items-center
          font-squids text-white text-xl text-deep-shadow-custom box-shadow-custom
          border-2 border-white rounded-md transition-all hover:text-secondary hover:border-secondary'>
            <FontAwesomeIcon icon={faChevronLeft} className='ml-3' />
            <p className='m-3'>return</p></button>
          <div className='w-full h-full bg-contain bg-center
          bg-gif_game_2 bg-no-repeat' />
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
      <div className='w-11/12 lg:w-6/12 m-auto rotate-90 sm:rotate-0 aspect-square sm:aspect-video relative border-2 bg-neutral-900
      rounded-sm overflow-hidden box-shadow-custom'>
          <UnityEngine title={(title !== undefined && title !== null) ? title : ''} />
      </div>
    </div>
  )
}

export default Game
