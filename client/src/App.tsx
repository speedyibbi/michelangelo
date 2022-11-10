import React, { ReactElement, Suspense } from 'react'
import Loader from './components/Loader'

const Home = React.lazy(async () => await import('./views/Home'))
const WebGLPlayground = React.lazy(async () => await import('./components/WebGLPlayground'))

const App = (): ReactElement => {
  return (
    <Suspense fallback={ <Loader /> }>
      <section className='min-h-screen relative overflow-x-hidden'>
        <div className='w-full h-full absolute'>
          <Home />
        </div>
        <div className='w-full h-full absolute bg-main bg-cover -z-10'>
          <WebGLPlayground />
        </div>
      </section>
    </Suspense>
  )
}

export default App
