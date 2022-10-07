import React, { ReactElement } from 'react'
import { Route, Routes } from 'react-router-dom'
// components
import Explore from './components/Explore'
import Search from './components/Search'

const Views = (): ReactElement => {
  return (
    <Routes>
        <Route path='/' element={ <Explore /> } />
        <Route path='/search' element={ <Search /> } />
        <Route path='*' element=
        { <div className='Error--404'><h1>Error 404: Page not found</h1></div> } />
      </Routes>
  )
}

export default Views
