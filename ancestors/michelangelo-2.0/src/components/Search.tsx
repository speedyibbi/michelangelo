import React, { ReactElement, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
// utilites
import { GamesSearch } from '../utilities/Controller'
// interfaces
import game from '../interfaces/GameInterface'
// components
import MultiGameDisplay from './MultiGameDisplay'

const Search = (): ReactElement => {
  const [searchParams] = useSearchParams()
  const [searchItem, setSearchItem] = useState<string | null>(null)
  const [games, setGames] = useState<game[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setSearchItem(searchParams.get('item'))
  }, [searchParams])

  useEffect(() => {
    if (searchItem !== null) {
      setLoading(true)
      GamesSearch(500, 0, searchItem)
        .then((response) => {
          setGames(response)
          setLoading(false)
        })
        .catch(() => {
          console.error('Something went wrong')
        })
    }
  }, [searchItem])

  if (games?.length !== 0) {
    return (
      <div className='Search'>
        <div className="Search__heading">
          <h4>Showing <span className='Search__heading__number'>{ games?.length }</span> results for
          <span className='Search__heading__item'> &quot;{ searchItem }&quot;</span></h4>
        </div>
        <div className="Search__games">
          <MultiGameDisplay games = { isLoading ? null : games } />
        </div>
      </div>
    )
  } else {
    return (
      <div className='Search'>
        <h4 className='Search__foundNone'>No games found by the name &quot;{ searchItem }&quot;</h4>
      </div>
    )
  }
}

export default Search
