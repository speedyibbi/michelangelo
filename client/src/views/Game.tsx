import React, { ReactElement, useContext, useEffect, useState } from 'react'
import UnityEngine from '../components/UnityEngine'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { ViewContext } from '../Views'
import { Game } from '../utilities/interfaces'

const GameView = (): ReactElement => {
  const navigate = useNavigate()
  const { title } = useParams()
  const { setFlash } = useContext(ViewContext)
  const [game, setGame] = useState<Game>()

  const goBack = (): void => { navigate(-1) }

  useEffect(() => {
    const getGameInfo = async (): Promise<void> => {
      const response = await fetch(`/games/${title !== undefined ? title : ''}`, { method: 'GET' })
        .then(async (res) => await res.json())
        .catch(() => {
          navigate('/')
          setFlash({ type: 'error', text: 'Could not find game' })
        })
      setGame(response)
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
            <p className='my-3 px-5'><span className='text-white'>Title - </span>{game !== undefined ? game.title : ''}</p>
            <p className='my-3 px-5'><span className='text-white'>Description - </span>{game !== undefined ? game.description : ''}</p>
          </div>
          <div>
            <p className='my-3 px-5'><span className='text-white'>Created by </span>{game !== undefined ? game.creator : ''}</p>
          </div>
        </div>
      </div>
      <div className='w-11/12 lg:w-6/12 m-auto rotate-90 sm:rotate-0 aspect-square sm:aspect-video relative border-2 bg-neutral-900
      rounded-sm overflow-hidden box-shadow-custom'>
        <UnityEngine game={title !== undefined ? title : ''} />
      </div>
    </div>
  )
}

export default GameView
