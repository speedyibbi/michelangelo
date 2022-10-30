/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, Suspense } from 'react'
import Loader from './components/Loader'

const Home = React.lazy(async () => await import('./views/Home'))
const WebGLCanvas = React.lazy(async () => await import('./components/WebGL Canvas'))

const App = (): ReactElement => {
  return (
    <Suspense fallback={
      <div className='min-h-screen flex justify-center items-center bg-gradient'>
        <Loader />
      </div>
    }>
      <section className='min-h-screen relative overflow-x-hidden'>
        <div className='w-full h-full absolute'>
            <Home />
        </div>
        <div className='w-full h-full absolute bg-main bg-cover -z-10'>
            <WebGLCanvas />
        </div>
      </section>
      {/* <div className='min-h-screen flex flex-col justify-around items-center bg-gradient'>
        <Loader />
      </div> */}
    </Suspense>
  )
}

export default App
