import React, { ReactElement } from 'react'
import Searchbar from './Searchbar'

const Nav = (): ReactElement => {
  return (
    <nav className='w-full h-full flex items-center font-caviar'>
      <a href="" className='m-auto flex'>
        <img src="/images/favicon.png" alt="" className='w-7 mx-3 my-auto image-shadow-custom'/>
        <h2 className='font-squids text-primary text-2xl text-shadow-custom'>
          michelangelo</h2>
      </a>
      <Searchbar />
    </nav>
  )
}

export default Nav
