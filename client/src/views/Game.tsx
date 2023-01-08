import React, { ReactElement } from 'react'
import UnityEngine from '../components/UnityEngine'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const Game = (): ReactElement => {
  const navigate = useNavigate()

  const goBack = (): void => {
    navigate(-1)
  }

  return (
    <div className='w-11/12 h-full m-auto relative flex justify-center items-center'>
        <button onClick={goBack} className='absolute top-10 left-10 flex items-center
        font-squids text-white text-xl text-deep-shadow-custom box-shadow-custom
        border-2 border-white rounded-md transition-all hover:text-primary hover:border-primary'>
            <FontAwesomeIcon icon={faChevronLeft} className='ml-3' />
            <p className='m-3'>return</p></button>
        <div className='w-7/12 aspect-video relative border-2 bg-neutral-900
        rounded-sm overflow-hidden'>
            <UnityEngine />
        </div>
    </div>
  )
}

export default Game
