import React, { ReactElement, useState, useEffect } from 'react'
import { animated, useTransition } from 'react-spring'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Flash = (props: { type: string, text: string, onDismissal: Function }): ReactElement => {
  const [show, setShow] = useState(true)
  const transition = useTransition(show, {
    from: { y: 100 },
    enter: { y: 0 },
    leave: { y: 100 }
  })

  useEffect(() => {
    setTimeout(() => {
      setShow(false)
      props.onDismissal()
    }, 3000)
  }, [])

  return (
    <>
      {transition((style, item) => item &&
      <animated.div style={style} className={`max-w-full px-4 py-2 flex font-caviar text-white text-sm
      ${props.type === 'error' ? 'bg-special' : 'bg-secondary'} rounded-full box-shadow-custom`}>
        <p>{props.text}</p>
        <button onClick={() => { setShow(false); props.onDismissal() }} type='button'>
            <FontAwesomeIcon icon={faXmark} className='mx-3 my-auto' />
        </button>
      </animated.div>)}
    </>
  )
}

export default Flash
