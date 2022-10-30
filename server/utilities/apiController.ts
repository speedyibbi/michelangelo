import { Request, Response } from 'express'
import axios from 'axios'
import { ParseGameArray } from './dataParser'
import { axiosConfigInterface, gameInterface } from './interfaces'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}

const axiosConfig: axiosConfigInterface = {
  method: 'POST',
  url: '',
  headers: {
    'Content-Type': 'text/plain',
    'Client-ID': process.env.TWITCH_CI ?? '',
    Authorization: `Bearer ${process.env.TWITCH_TOKEN ?? ''}`
  },
  data: ''
}

export const GetGames = async (_req: Request, _res: Response): Promise<gameInterface[]> => {
  let games: gameInterface[] = []

  axiosConfig.url = 'https://api.igdb.com/v4/games'
  // axiosConfig.data = `fields name, total_rating, cover.url;
  // where name != null & total_rating >= 1 & summary != null &
  // release_dates != null & release_dates.human != "TBD" & cover.url != null &
  // ${queries.platform ?? ''} & ${queries.genre ?? ''} & ${queries.gameMode ?? ''};
  // sort ${queries.sort}; limit ${number}; offset ${offset};`
  axiosConfig.data = `fields name, total_rating, cover.url;
  where name != null & total_rating >= 1 & summary != null &
  release_dates != null & release_dates.human != "TBD" &
  platforms != null & genres != null & cover.url != null;
  sort total_rating_count desc; limit 1; offset 0;`

  await axios(axiosConfig)
    .then((response: any) => {
      return response.data
    })
    .then((data: JSON[]) => {
      games = ParseGameArray(data)
    })
    .catch(() => {
      console.error('\x1b[1;31m', 'Something went wrong')
    })

  return games
}
