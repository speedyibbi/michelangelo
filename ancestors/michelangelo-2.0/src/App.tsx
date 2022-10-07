import React, { ReactElement } from 'react'
import { BrowserRouter } from 'react-router-dom'
// components
import Nav from './components/Nav'
import Footer from './components/Footer'
import Views from './Views'

const App = (): ReactElement => {
  return (
    <BrowserRouter>
      <Nav />
      <Views />
      <Footer />
    </BrowserRouter>
  )
}

export default App
