import React, { ReactElement, useEffect, useState } from 'react'
import { Unity, useUnityContext } from 'react-unity-webgl'
import { quoteInterface } from '../utilities/interfaces'
import { quotes } from '../utilities/static'

const Home = (): ReactElement => {
  const { unityProvider } = useUnityContext({
    loaderUrl: 'client/demo/demo.loader.js',
    dataUrl: 'client/demo/demo.data',
    frameworkUrl: 'client/demo/demo.framework.js',
    codeUrl: 'client/demo/demo.wasm'
  })
  const [quote, setQuote] = useState<quoteInterface>()

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <article className='h-full grid grid-cols-2 overflow-hidden'>
      <div className='h-full grid grid-rows-3'>
        <div className='row-span-1 col-span-1 bg-contain bg-center bg-gif bg-no-repeat' />
        <div className='mx-7 row-start-2 row-end-4 col-span-1 border-2 bg-neutral-900 rounded-sm'>
          <Unity unityProvider={unityProvider} />
        </div>
      </div>
      <p className='w-3/4 h-11/12 m-auto col-span-1 font-caviar
      text-white text-2xl text-center text-shadow-custom'>
        &quot;{ quote?.body }&quot; <br /> - { quote?.game }<br />
        <button className='m-5 p-3 relative font-squids text-primary text-lg rounded-md
        box-shadow-custom bg-stone-800 border-2 border-primary transition-all
        hover:text-stone-800 hover:bg-primary hover:scale-110'>Explore Games</button>
      </p>
    </article>
  )
}

export default Home
