import 'dotenv/config';
import {Request, Response} from 'express';
import axios from 'axios';
import dataParser from '../dataParser';

const clientID = process.env.TWITCH_CI;
const accessToken = process.env.TWITCH_TOKEN;
const axiosConfig = {
  method: 'post',
  url: '',
  headers: {
    'Content-Type': 'text/plain',
    'Client-ID': clientID!,
    'Authorization': `Bearer ${accessToken}`,
  },
  data: '',
};

export const getGames = async (req: Request, res: Response) => {
  let games: any = null;
  axiosConfig.url = `https://api.igdb.com/v4/games`;
  if (req.query.type == 'popular') {
    axiosConfig.data = `fields name, total_rating, cover.url;
    where name != null & total_rating >= 1 & summary != null &
    release_dates != null & release_dates.human != "TBD" &
    platforms != null & genres != null & cover.url != null;
    sort total_rating_count desc; limit ${req.query.number}; offset 0;`;
    await axios(axiosConfig)
        .then((response: any) => {
          games = response.data.map((game: {}) => {
            return dataParser(game, 1);
          });
          res.send(games);
        });
  } else if (req.query.type == 'recent') {
    axiosConfig.data = `fields name, total_rating, cover.url;
    where name != null &  total_rating >= 1 & summary != null &
    release_dates != null & release_dates.human != "TBD" & platforms != null &
    genres != null & cover.url != null &
    status != 6 & status != 7 & status != 8;
    sort first_release_date desc; limit ${req.query.number}; offset 0;`;
    await axios(axiosConfig)
        .then((response: any) => {
          games = response.data.map((game: {}) => {
            return dataParser(game, 1);
          });
          res.send(games);
        });
  } else {
    res.send('Invalid request');
  };
};

export const getGenres = async (_: Request, res: Response) => {
  let genres: any = null;
  axiosConfig.url = `https://api.igdb.com/v4/genres`;
  axiosConfig.data = `fields name; where name != null; limit 50;`;
  await axios(axiosConfig)
      .then((response: any) => {
        genres = response.data;
        res.send(genres);
      });
};

export const getGameByID = async (req: Request, res: Response) => {
  let game: any = null;
  axiosConfig.url = `https://api.igdb.com/v4/games`;
  axiosConfig.data = `fields name, total_rating, summary, release_dates.human,
  platforms.name, platforms.slug, platforms.platform_family.slug,
  genres.name, genres.slug, game_modes.name, involved_companies.company.name,
  involved_companies.developer, cover.url;
  where id = ${req.params.gameID} & name != null & total_rating >= 1 &
  summary != null & release_dates != null & release_dates.human != "TBD" &
  platforms != null & genres != null &
  game_modes != null & cover.url != null;
  limit 1; offset 0;`;
  await axios(axiosConfig)
      .then((response: any) => {
        game = dataParser(response.data[0], 2);
        res.send(game);
      });
};

export const getGamesByGenre = async (req: Request, res: Response) => {
  let games: any = null;
  axiosConfig.url = `https://api.igdb.com/v4/games`;
  axiosConfig.data = `fields name, total_rating, cover.url;
  where genres = (${req.params.genreID}) & name != null & total_rating >= 1 &
  summary != null & release_dates != null & release_dates.human != "TBD" &
  platforms != null & genres != null &
  game_modes != null & cover.url != null;
  sort total_rating_count desc; limit ${req.query.number};
  offset ${req.query.offset};`;
  await axios(axiosConfig)
      .then((response: any) => {
        games = response.data.map((game: {}) => {
          return dataParser(game, 1);
        });
        res.send(games);
      });
};

export const getGamesByPlatform = async (req: Request, res: Response) => {
  let games: any = null;
  axiosConfig.url = `https://api.igdb.com/v4/games`;
  if (req.query.pc == 'true') {
    axiosConfig.data = `fields name, total_rating, cover.url;
    where platforms = (6) & name != null & total_rating >= 1 &
    summary != null & release_dates != null & release_dates.human != "TBD" &
    platforms != null & genres != null & game_modes != null & cover.url != null;
    sort total_rating_count desc; limit ${req.query.number};
    offset ${req.query.offset};`;
  } else {
    axiosConfig.data = `fields name, total_rating, cover.url;
    where platforms.platform_family = (${req.params.platformID}) &
    name != null & total_rating >= 1 & summary != null & release_dates != null &
    release_dates.human != "TBD" & platforms != null &
    platforms.platform_family != null & genres != null &
    game_modes != null & cover.url != null;
    sort total_rating_count desc; limit ${req.query.number};
    offset ${req.query.offset};`;
  };
  await axios(axiosConfig)
      .then((response: any) => {
        games = response.data.map((game: {}) => {
          return dataParser(game, 1);
        });
        res.send(games);
      });
};

export const getGenreByID = async (req: Request, res: Response) => {
  let genre: any = null;
  axiosConfig.url = `https://api.igdb.com/v4/genres`;
  axiosConfig.data = `fields name; where id = ${req.params.genreID} &
  name != null;`;
  await axios(axiosConfig)
      .then((response: any) => {
        genre = response.data[0];
        res.send(genre);
      });
};

export const getPlatformByID = async (req: Request, res: Response) => {
  let platform: any = null;
  if (req.query.pc == 'true') {
    axiosConfig.url = `https://api.igdb.com/v4/platforms`;
    axiosConfig.data = `fields name;
    where id = 6 & name != null;`;
  } else {
    axiosConfig.url = `https://api.igdb.com/v4/platform_families`;
    axiosConfig.data = `fields name;
    where id = ${req.params.platformID} & name != null;`;
  };
  await axios(axiosConfig)
      .then((response: any) => {
        platform = response.data[0];
        res.send(platform);
      });
};
