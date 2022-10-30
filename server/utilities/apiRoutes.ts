import express from 'express'

import {
//   getGames, getGenres, getGameByID, getGamesByGenre,
//   getGenreByID, getGamesByPlatform, getPlatformByID
  GetGames
}
  from './apiController'
import AsyncCatcher from './asyncCatcher'
// eslint-disable-next-line new-cap
const router = express.Router()

router.route('/games')
  .get(AsyncCatcher(GetGames))

// router.route('/games/:gameID')
//   .get(AsyncCatcher(getGameByID))

// router.route('/genres')
//   .get(AsyncCatcher(getGenres))

// router.route('/genres/:genreID/name')
//   .get(AsyncCatcher(getGenreByID))

// router.route('/genres/:genreID')
//   .get(AsyncCatcher(getGamesByGenre))

// router.route('/platforms/:platformID/name')
//   .get(AsyncCatcher(getPlatformByID))

// router.route('/platforms/:platformID')
//   .get(AsyncCatcher(getGamesByPlatform))

export default router
