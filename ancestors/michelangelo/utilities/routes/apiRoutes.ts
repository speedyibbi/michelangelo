import express from 'express';
// eslint-disable-next-line new-cap
const router = express.Router();

import {getGames, getGenres, getGameByID, getGamesByGenre,
  getGenreByID, getGamesByPlatform, getPlatformByID}
  from '../controllers/apiController';
import asyncCatcher from '../asyncCatcher';

router.route('/games')
    .get(asyncCatcher(getGames));

router.route('/games/:gameID')
    .get(asyncCatcher(getGameByID));

router.route('/genres')
    .get(asyncCatcher(getGenres));

router.route('/genres/:genreID/name')
    .get(asyncCatcher(getGenreByID));

router.route('/genres/:genreID')
    .get(asyncCatcher(getGamesByGenre));

router.route('/platforms/:platformID/name')
    .get(asyncCatcher(getPlatformByID));

router.route('/platforms/:platformID')
    .get(asyncCatcher(getGamesByPlatform));

export default router;
