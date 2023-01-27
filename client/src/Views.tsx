import React, { ReactElement, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { animated, useSpring, useTransition } from 'react-spring'
import Home from './views/Home'
import GameExplore from './views/GameExplore'
import GameForm from './views/GameForm'
import Game from './views/Game'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Flash from './components/Flash'

interface Context {
  user: { email?: string, username?: string }
  setUser: Function
  setFlash: Function
}

export const ViewContext = React.createContext<Context>({ user: {}, setUser: () => {}, setFlash: () => {} })

const Views = (): ReactElement => {
  const [user, setUser] = useState<{ email?: string, username?: string }>({})
  const [flash, setFlash] = useState<{ type?: string, text?: string }>({})
  const location = useLocation()
  const navbarSpring = useSpring({ from: { y: -500 }, y: 0 })
  const footerSpring = useSpring({ from: { y: 500 }, y: 0 })
  const routeSpring = useTransition(location, {
    from: { opacity: 0, transform: 'scale(1.1)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.9)' }
  })

  const resetFlash = (): void => { setTimeout(() => { setFlash({}) }, 1000) }

  return (
    <>
      <ViewContext.Provider value={{ user, setUser, setFlash }}>
        <div className='w-full h-full absolute grid-custom overflow-x-hidden'>
          <animated.span style={navbarSpring}><Nav /></animated.span>
          {routeSpring((styles, item) => (
            <animated.div style={styles}>
              <Routes location={item}>
                <Route path='/' element={ <Home /> } />
                <Route path='/games' element={ <GameExplore /> } />
                <Route path='/games/new' element={ <GameForm /> } />
                <Route path='/games/:title' element={ <Game /> } />
                <Route path='*' element={
                <h1 className='h-full flex justify-center items-center
                font-caviar text-white text-2xl text-deep-shadow-custom'>
                  Page not found</h1> } />
              </Routes>
            </animated.div>
          ))}
          <animated.span style={footerSpring}><Footer /></animated.span>
        </div>
      </ViewContext.Provider>
      <div className='absolute right-10 bottom-10'>
        {(flash.type !== undefined && flash.text !== undefined)
          ? <Flash type={flash.type} text={flash.text} onDismissal={resetFlash} />
          : ''}
      </div>
    </>
  )
}

export default Views
