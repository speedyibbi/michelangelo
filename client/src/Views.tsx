import React, { ReactElement, useState } from 'react'
import Home from './views/Home'
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

  const resetFlash = (): void => { setTimeout(() => { setFlash({}) }, 1000) }

  return (
    <>
        <ViewContext.Provider value={{ user, setUser, setFlash }}>
            <div className='w-full h-full absolute'>
                <Home />
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
