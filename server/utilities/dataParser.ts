import { gameInterface } from './interfaces'

export const ParseGameArray = (gameArray: JSON[]): gameInterface[] => {
  const parsedGame: gameInterface = { id: -1 }
  const parsedGameArray: gameInterface[] = gameArray.map((game: any) => {
    parsedGame.id = game.id
    parsedGame.name = game.name
    parsedGame.rating = game.total_rating.toFixed(1)
    parsedGame.cover = game.cover.url.replace('t_thumb', 't_cover_big')
    return parsedGame
  })

  return parsedGameArray
}

export const ParseGame = (_game: any): gameInterface => {
  const parsedGame: gameInterface = { id: -1 }
  return parsedGame
}
