/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, useState } from 'react'
import { animated, useTransition } from 'react-spring'

const Nav = (): ReactElement => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loadForm, setLoadForm] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const [signupForm, setSignupForm] = useState(false)
  const transition = useTransition(loadForm, {
    from: { y: -500 },
    enter: { y: 0 },
    leave: { y: -500 }
  })

  return (
    <nav className='w-full h-full flex items-center font-caviar'>
      <a href="" className='w-1/2 flex justify-center'>
        <img src="/images/favicon.png" alt="" className='w-7 mx-3 my-auto image-shadow-custom'/>
        <h2 className='font-squids text-primary text-2xl text-deep-shadow-custom'>
          michelangelo</h2>
      </a>
      <div className='w-1/2 flex justify-center items-center'>
        {transition((style, item) => item
          ? (loginForm && !signupForm)
              ? <animated.form style={style} onSubmit={ (event) => { event.preventDefault() } }
            className='absolute'>
              <input type='text' placeholder='username'
              className='m-6 p-2 pl-5 text-white text-sm border-2 border-primary
              rounded-full outline-none box-shadow-custom transition-all bg-transparent' />
              <input type='password' placeholder='password'
              className='m-6 p-2 pl-5 text-white text-sm border-2 border-primary
              rounded-full outline-none box-shadow-custom transition-all bg-transparent' />
              <button className='m-5 p-3 font-squids text-primary text-sm rounded-md
              box-shadow-custom border-2 border-primary transition-all
              hover:text-stone-800 hover:bg-primary hover:scale-110'>Log In</button>
            </animated.form>
              : (!loginForm && signupForm)
                  ? <animated.form style={style} onSubmit={ (event) => { event.preventDefault() } }
              className='absolute'>
                <input type='text' placeholder='username'
                className='m-6 p-2 pl-5 text-white text-sm border-2 border-primary
                rounded-full outline-none box-shadow-custom transition-all bg-transparent' />
                <input type='password' placeholder='password'
                className='m-6 p-2 pl-5 text-white text-sm border-2 border-primary
                rounded-full outline-none box-shadow-custom transition-all bg-transparent' />
                <button className='m-5 p-3 font-squids text-primary text-sm rounded-md
                box-shadow-custom border-2 border-primary transition-all
                hover:text-stone-800 hover:bg-primary hover:scale-110'>Sign Up</button>
              </animated.form>
                  : 'error'
          : <animated.div style={style} className='absolute'>
          {!loggedIn
            ? <><button onClick={() => { setLoadForm(true); setLoginForm(true); setSignupForm(false) }}
              className='m-5 p-3 relative font-squids text-primary text-sm border-2 border-primary
              rounded-md box-shadow-custom transition-all hover:bg-primary hover:text-stone-800'>
              Log In</button>
              <button onClick={() => { setLoadForm(true); setLoginForm(false); setSignupForm(true) }}
              className='m-5 p-3 relative font-squids text-primary text-sm border-2 border-primary
              rounded-md box-shadow-custom transition-all hover:bg-primary hover:text-stone-800'>
              Sign Up</button></>
            : <><button className='m-5 p-3 relative font-squids text-primary text-sm border-2 border-primary
              rounded-md box-shadow-custom transition-all hover:bg-primary hover:text-stone-800'>
              Sign Out</button></>}
            </animated.div>
        )}
      </div>
    </nav>
  )
}

export default Nav
