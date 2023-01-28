import React, { ReactElement, Suspense } from 'react'
import Loader from './components/Loader'

const Views = React.lazy(async () => await import('./Views'))
const WebGLPlayground = React.lazy(async () => await import('./components/WebGLPlayground'))

const App = (): ReactElement => {
  return (
    <Suspense fallback={ <Loader /> }>
      <section className='min-h-screen relative overflow-hidden'>
        <Views />
        <div className='w-full h-full absolute bg-main bg-cover bg-center -z-10'>
          <WebGLPlayground />
        </div>
      </section>
    </Suspense>
  )
}

export default App
