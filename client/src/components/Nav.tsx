import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { animated, useTransition } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { ViewContext } from '../Views'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const Nav = (): ReactElement => {
  const { user, setUser, setFlash } = useContext(ViewContext)
  const [loadForm, setLoadForm] = useState(false)
  const [formType, setFormType] = useState(0)
  const [transitioning, setTransitioning] = useState(false)
  const transition = useTransition(loadForm, {
    from: { y: -250 },
    enter: { y: 0 },
    leave: { y: -250 }
  })

  const formSet = (load = false, type = 0, delay = true): void => {
    setLoadForm(load)
    if (!load) type = 0
    setTransitioning(true)
    setTimeout(() => {
      setFormType(type)
      setTransitioning(false)
    }, (delay ? 1000 : 0))
  }

  const signOut = async (): Promise<void> => {
    const response = await fetch('/users/logout', { method: 'GET' })
      .then(async (res) => await res.json())
    if (response.successful === true) {
      setFlash({ type: 'success', text: response.message })
      setUser({})
    } else {
      setFlash({ type: 'error', text: response.message })
    }
  }

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      const user = await fetch('/users', { method: 'GET' })
        .then(async (res) => await res.json())
      if (user.email !== undefined && user.username !== undefined) {
        setUser({ email: user.email, username: user.username })
      }
    }
    void getUser()
  }, [])

  return (
    <nav className='w-full h-full px-auto py-3 flex flex-wrap items-center font-caviar'>
      <Link to='/' className='w-full lg:w-1/2 mt-6 mb-2 lg:my-0 flex justify-center'>
        <img src="/images/favicon.png" alt='' className='w-7 mx-3 my-auto image-shadow-custom'/>
        <h2 className='my-auto font-squids text-primary text-2xl text-deep-shadow-custom'>
          michelangelo</h2>
      </Link>
      <div className='w-full lg:w-1/2 lg:pr-10 flex justify-center lg:justify-end items-center'>
        {transition((style, item) => item
          ? <animated.div style={style} className='lg:absolute'>
            {(formType === 1)
              ? <div className='w-full flex justify-evenly'>
                  <LoginForm onSuccess={() => { formSet() }} />
                  <button onClick={() => { formSet() } }>
                  <FontAwesomeIcon icon={faArrowUp}
                    className='ml-2 hidden lg:block text-primary text-xl transition-all hover:scale-110' /></button>
                </div>
              : (formType === 2)
                  ? <div className='w-full flex justify-evenly'>
                      <SignupForm onSuccess={() => { formSet() }} />
                      <button onClick={() => { formSet() } }>
                      <FontAwesomeIcon icon={faArrowUp}
                        className='ml-2 hidden lg:block text-primary text-xl transition-all hover:scale-110' /></button>
                    </div>
                  : ''}
            </animated.div>
          : <animated.div style={style} className='lg:absolute'>
          {user.email === undefined && user.username === undefined
            ? <><button disabled={transitioning} onClick={() => { formSet(true, 1, false) }}
                className='mx-1 sm:m-5 px-10 py-3 lg:p-3 relative font-squids text-primary text-sm border-2 border-primary
                rounded-md box-shadow-custom transition-all hover:bg-primary hover:text-stone-800'>
                Log In</button>
                <button disabled={transitioning} onClick={() => { formSet(true, 2, false) }}
                className='mx-1 sm:m-5 px-10 py-3 lg:p-3 relative font-squids text-primary text-sm border-2 border-primary
                rounded-md box-shadow-custom transition-all hover:bg-primary hover:text-stone-800'>
                Sign Up</button></>
            : <><Link to='/games/new'
                className='mx-1 sm:m-5 px-5 sm:px-10 py-3 lg:p-3 relative font-squids text-primary text-sm border-2 border-primary
                rounded-md box-shadow-custom transition-all hover:bg-primary hover:text-stone-800'>
                Upload Game</Link>
                <button onClick={() => { void signOut() }}
                className='mx-1 sm:m-5 px-5 sm:px-10 py-3 lg:p-3 relative font-squids text-primary text-sm border-2 border-primary
                rounded-md box-shadow-custom transition-all hover:bg-primary hover:text-stone-800'>
                Sign Out</button></>}
            </animated.div>
        )}
      </div>
    </nav>
  )
}

export default Nav
