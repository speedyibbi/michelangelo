// utilities
import DataParser from './DataParser'
// interfaces
import game from '../interfaces/GameInterface'
import genre from '../interfaces/GenreInterface'
import gameMode from '../interfaces/GameModeInterface'
import filter from '../interfaces/FilterInterface'

interface fetchConfigInterface {
  method: string
  headers: { [key: string]: string }
  body: string
}

const { REACT_APP_TWITCH_CI, REACT_APP_TWITCH_TOKEN } = process.env
const clientID = REACT_APP_TWITCH_CI
const accessToken = REACT_APP_TWITCH_TOKEN
const proxy = 'https://cors-anywhere-proxy-speedyibbi.herokuapp.com/'
const fetchConfig: fetchConfigInterface = {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain',
    'Client-ID': clientID ?? '',
    Authorization: `Bearer ${accessToken ?? ''}`,
    'x-requested-with': ''
  },
  body: ''
}

export const GetGames = async (number: number, offset: number, filters: filter):
Promise<game[]> => {
  let games: game[] = [{ id: -1 }]

  const queries: filter = {
    sort: '',
    platform: '',
    genre: '',
    gameMode: ''
  }

  if (filters.sort === undefined || filters.sort === null) queries.sort = 'total_rating_count desc'
  else queries.sort = filters.sort
  if (filters.platform === undefined || filters.platform === null) queries.platform = 'platforms != null'
  else if (filters.platform === 6) queries.platform = 'platforms = (6)'
  else queries.platform = `platforms.platform_family = (${filters.platform})`
  if (filters.genre === undefined || filters.genre === null) queries.genre = 'genres != null'
  else queries.genre = `genres = (${filters.genre})`
  if (filters.gameMode === undefined || filters.gameMode === null) queries.gameMode = 'game_modes != null'
  else queries.gameMode = `game_modes = (${filters.gameMode})`

  fetchConfig.body = `fields name, total_rating, cover.url;
  where name != null & total_rating >= 1 & summary != null &
  release_dates != null & release_dates.human != "TBD" &
  ${queries.platform ?? ''} & ${queries.genre ?? ''} & ${queries.gameMode ?? ''} & cover.url != null;
  sort ${queries.sort}; limit ${number}; offset ${offset};`
  await fetch(`${proxy}https://api.igdb.com/v4/games`, fetchConfig)
    .then((response: any) => {
      return response.json()
    })
    .then((response: JSON[]) => {
      games = response.map((game: {}) => {
        return DataParser(game, 1)
      })
    })
    .catch(() => {
      console.error('Something went wrong')
    })

  return games
}

export const GamesSearch = async (number: number, offset: number, search: string):
Promise<game[]> => {
  let games: game[] = [{ id: -1 }]

  fetchConfig.body = `search "${search}";
  fields name, total_rating, cover.url;
  where name != null & total_rating >= 1 & summary != null &
  release_dates != null & release_dates.human != "TBD" &
  platforms != null & genres != null & game_modes != null & cover.url != null;
  limit ${number}; offset ${offset};`
  await fetch(`${proxy}https://api.igdb.com/v4/games`, fetchConfig)
    .then((response: any) => {
      return response.json()
    })
    .then((response: JSON[]) => {
      games = response.map((game: {}) => {
        return DataParser(game, 1)
      })
    })
    .catch(() => {
      console.error('Something went wrong')
    })

  return games
}

export const GetGenres = async (): Promise<genre[]> => {
  let genres: genre[] = [{ id: -1 }]

  fetchConfig.body = 'fields name, slug; where name != null & slug != null; limit 50;'
  await fetch(`${proxy}https://api.igdb.com/v4/genres`, fetchConfig)
    .then((response: any) => {
      return response.json()
    })
    .then((response: genre[]) => {
      genres = response
    })
    .catch(() => {
      console.error('Something went wrong')
    })

  return genres
}

export const GetGameModes = async (): Promise<gameMode[]> => {
  let gameModes: gameMode[] = [{ id: -1 }]

  fetchConfig.body = 'fields name; where name != null; limit 50;'
  await fetch(`${proxy}https://api.igdb.com/v4/game_modes`, fetchConfig)
    .then((response: any) => {
      return response.json()
    })
    .then((response: gameMode[]) => {
      gameModes = response
    })
    .catch(() => {
      console.error('Something went wrong')
    })

  return gameModes
}
