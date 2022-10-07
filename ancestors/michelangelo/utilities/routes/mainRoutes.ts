import express from 'express';
import path from 'path';
// eslint-disable-next-line new-cap
const router = express.Router();

router.route('/')
    .get((_, res) => {
      res.sendFile('index.html', {root: path.join(__dirname,
          '../../public/html')});
    });

router.route('/game/:gameID')
    .get((_, res) => {
      res.sendFile('game.html', {root: path.join(__dirname,
          '../../public/html')});
    });

router.route('/genre/:genreID')
    .get((_, res) => {
      res.sendFile('genre.html', {root: path.join(__dirname,
          '../../public/html')});
    });

router.route('/platform/:platformID')
    .get((_, res) => {
      res.sendFile('platform.html', {root: path.join(__dirname,
          '../../public/html')});
    });

export default router;
