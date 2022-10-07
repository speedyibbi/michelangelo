import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
// components
import SearchBar from './SearchBar'

const Nav = (): ReactElement => {
  return (
    <nav>
        <Link to="/">
            <img src="/images/favicon2.png" alt="" />
            <h2>michelangelo</h2>
        </Link>
        <SearchBar />
    </nav>
  )
}

export default Nav
