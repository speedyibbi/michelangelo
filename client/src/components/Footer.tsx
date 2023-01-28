import React, { ReactElement } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = (): ReactElement => {
  return (
    <footer className='w-full h-full py-3 flex justify-center items-center '>
        <p className='font-caviar text-muted'>&copy;michelangelo</p>
        <a href='https://www.instagram.com/michelangelo_games' target='_blank' rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} className='mx-3 text-2xl text-pink-600' />
        </a>
    </footer>
  )
}

export default Footer
