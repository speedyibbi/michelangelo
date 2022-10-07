import React, { ReactElement, useEffect, useState } from 'react'
// utilities
import { GetGames, GetGenres, GetGameModes } from '../utilities/Controller'
import GamesSorter from '../utilities/GamesSorter'
// interfaces
import game from '../interfaces/GameInterface'
import genre from '../interfaces/GenreInterface'
import gameMode from '../interfaces/GameModeInterface'
import filter from '../interfaces/FilterInterface'
// components
import MultiGameDisplay from './MultiGameDisplay'

const Explore = (): ReactElement => {
  const [sortTitle, setSortTitle] = useState<string>('Sort')
  const [platformTitle, setPlatformTitle] = useState<string>('Platforms')
  const [genreTitle, setGenreTitle] = useState<string>('Genres')
  const [genres, setGenres] = useState<genre[] | null>(null)
  const [gameModeTitle, setGameModeTitle] = useState<string>('Game Modes')
  const [gameModes, setGameModes] = useState<gameMode[] | null>(null)

  const [isLoading, setLoading] = useState<boolean>(true)
  const [isLoadingMore, setLoadingMore] = useState<boolean>(false)

  const [games, setGames] = useState<game[] | null>(null)
  const [gamesPerSearch, setGamesPerSearch] = useState<number>(20)
  const [gamesSearchOffset, setGamesSearchOffset] = useState<number>(0)
  const [gameFilters, setGameFilters] = useState<filter>(
    { sort: null, platform: null, genre: null, gameMode: null })

  const SortHandler = (data: any, sortType: string | null): void => {
    setSortTitle(data.target.innerText)
    const filters = gameFilters
    filters.sort = sortType
    setGameFilters(filters)
  }

  const PlatformHandler = (data: any, platformID: number | null): void => {
    setPlatformTitle(data.target.innerText)
    const filters = gameFilters
    filters.platform = platformID
    setGameFilters(filters)
  }

  const GenreHandler = (data: any, genreID: number | null): void => {
    setGenreTitle(data.target.innerText)
    const filters = gameFilters
    filters.genre = genreID
    setGameFilters(filters)
  }

  const GameModeHandler = (data: any, gameModeID: number | null): void => {
    setGameModeTitle(data.target.innerText)
    const filters = gameFilters
    filters.gameMode = gameModeID
    setGameFilters(filters)
  }

  const Filter = async (): Promise<void> => {
    setLoading(true)
    await GetGames(gamesPerSearch, 0, gameFilters)
      .then((response) => {
        setGames(response)
        setGamesSearchOffset(0 + gamesPerSearch)
        setLoading(false)
      })
      .catch(() => {
        console.error('Something went wrong')
      })
  }

  const LoadMoreHandler = async (data: any): Promise<void> => {
    setLoadingMore(true)
    await GetGames(gamesPerSearch, gamesSearchOffset, gameFilters)
      .then((response: game[]) => {
        if (games === null) {
          setGames(response)
        } else {
          if (gamesSearchOffset === 0) {
            setGames(response)
          } else {
            setGames([...games, ...response])
          }
        }
        setLoadingMore(false)
        if (response.length === 0) {
          data.target.style.opacity = '0'
        }
      })
      .catch(() => {
        console.error('Something went wrong')
      })
    setGamesSearchOffset(gamesSearchOffset + gamesPerSearch)
  }

  useEffect(() => {
    GetGames(gamesPerSearch, 0, gameFilters)
      .then((response: game[]) => {
        setGames(response)
        setGamesSearchOffset(0 + gamesPerSearch)
        setLoading(false)
      })
      .catch(() => {
        console.error('Something went wrong')
      })
    GetGenres()
      .then((response) => {
        return JSON.stringify(response)
      })
      .then((data) => {
        setGenres(JSON.parse(data))
      })
      .catch(() => {
        console.error('Something went wrong')
      })
    GetGameModes()
      .then((response) => {
        return JSON.stringify(response)
      })
      .then((data) => {
        setGameModes(JSON.parse(data))
      })
      .catch(() => {
        console.error('Something went wrong')
      })
  }, [])

  return (
    <div className='Explore'>
      <ul className='Filters'>
        <li className='Filters__filter'>
          <p>{sortTitle}</p><i className='fa-solid fa-angle-down'></i>
          <ul className='Filters__filter__list'>
              <li onClick={(data) => { SortHandler(data, GamesSorter.Newest) }}>
                <p>Newest</p></li>
              <li onClick={(data) => { SortHandler(data, GamesSorter.Oldest) }}>
                <p>Oldest</p></li>
              <li onClick={(data) => { SortHandler(data, GamesSorter.Popular) }}>
                <p>Popular</p></li>
              <li onClick={(data) => { SortHandler(data, GamesSorter.Unpopular) }}>
                <p>Unpopular</p></li>
          </ul>
        </li>
        <li className='Filters__filter'>
          <p>{platformTitle}</p><i className='fa-solid fa-angle-down'></i>
          <ul className='Filters__filter__list'>
            <li onClick={(data) => { PlatformHandler(data, null) }}>
              <p>Any</p></li>
            <li onClick={(data) => { PlatformHandler(data, 6) }}>
              <p>PC</p><img className='Image--xsm'
            src="/images/platforms/win.png" alt="" /></li>
            <li onClick={(data) => { PlatformHandler(data, 1) }}>
              <p>PlayStation</p><img className='Image--xsm'
            src="/images/platforms/playstation.png" alt="" /></li>
            <li onClick={(data) => { PlatformHandler(data, 2) }}>
              <p>Xbox</p><img className='Image--xsm'
            src="/images/platforms/xbox.png" alt="" /></li>
            <li onClick={(data) => { PlatformHandler(data, 5) }}>
              <p>Nintendo</p><img className='Image--sm'
            src="/images/platforms/nintendo.png" alt="" /></li>
            <li onClick={(data) => { PlatformHandler(data, 3) }}>
              <p>Sega</p><img className='Image--sm'
            src="/images/platforms/sega.png" alt="" /></li>
          </ul>
        </li>
        <li className='Filters__filter'>
          <p>{genreTitle}</p><i className='fa-solid fa-angle-down'></i>
          <ul className='Filters__filter__list'>
            <li onClick={(data) => { GenreHandler(data, null) }}>
              <p>Any</p></li>
            {genres?.map((genre: genre) => {
              return (
                <li key={genre.id} onClick={(data) => { GenreHandler(data, genre.id) }}>
                    <p>{genre.name}</p>
                    <img className='Image--xsm'
                    src={`/images/genres/${genre.slug ?? ''}.png`} alt="" />
                </li>
              )
            })}
          </ul>
        </li>
        <li className='Filters__filter'>
          <p>{gameModeTitle}</p><i className='fa-solid fa-angle-down'></i>
          <ul className='Filters__filter__list'>
            <li onClick={(data) => { GameModeHandler(data, null) }}>
              <p>Any</p></li>
            {gameModes?.map((gameMode: gameMode) => {
              return (
                <li key={gameMode.id} onClick={(data) => { GameModeHandler(data, gameMode.id) }}>
                    <p>{gameMode.name}</p>
                </li>
              )
            })}
          </ul>
        </li>
        <li className='Filters__filter__range'>
          <input type="range" min={1} max={500} value={gamesPerSearch}
          onChange={(data) => { setGamesPerSearch(data.target.valueAsNumber) }} />
          <input type="number" min={1} max={500} value={gamesPerSearch} maxLength={3}
          onChange={(data) => { setGamesPerSearch(data.target.valueAsNumber) }} />
          <p>games per search</p>
        </li>
        <li className='Filters__submit' onClick={() => { void Filter() }}>
          Filter
        </li>
      </ul>
      <MultiGameDisplay games = { isLoading ? null : games } />
      <button onClick={ (data) => { void LoadMoreHandler(data) }}
        className={ isLoadingMore ? 'Loader Loader--small' : 'LoadMore' }
        style={ isLoading ? { opacity: '0' } : { opacity: '1' } }>
          { isLoadingMore ? '' : 'Load More' }
      </button>
    </div>
  )
}

export default Explore
