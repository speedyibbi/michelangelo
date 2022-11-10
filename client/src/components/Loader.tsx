import React, { ReactElement, useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'

const Loader = (): ReactElement => {
  const [loading, setLoading] = useState(false)
  const fadeTransition = useTransition(loading, {
    from: { y: 1000 },
    enter: { y: 0 },
    leave: { y: 1000 }
  })

  useEffect(() => { setLoading(true) }, [])

  return (
    <div className='min-h-screen flex flex-col justify-around items-center bg-gradient'>
      {fadeTransition((style, item) => item && <animated.span style={style} className='loader' />)}
    </div>
  )
}

export default Loader
