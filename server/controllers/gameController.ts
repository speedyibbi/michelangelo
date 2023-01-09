import { Request, Response } from 'express'
import path from 'path'
import { existsSync, readdirSync, rmSync, renameSync } from 'fs'
import { Error } from 'mongoose'
import decompress from 'decompress'
import gameModel from '../models/gameModel'
import userModel from '../models/userModel'

export const UploadGame = async (req: Request, res: Response): Promise<Response> => {
  const { title, description }: { title: string, description: string } = req.body
  // eslint-disable-next-line new-cap
  const game = await new gameModel({ title, description })
  // @ts-expect-error
  game.creator = req.user?._id
  const response = await game.save()
    .then(async () => {
      const creator = await userModel.findById(game.creator)
      creator.games.push(game._id)
      await userModel.findByIdAndUpdate(game.creator, { ...creator })
      return { successful: true, message: 'Game successfully uploaded!' }
    })
    .catch((error: Error) => {
      if (error.message.includes('E11000')) return { successful: false, message: 'Title already exists' }
      else return { successful: false, message: 'Game could not be uploaded' }
    })
  return res.send(JSON.stringify(response))
}

export const GetGames = async (req: Request, res: Response): Promise<Response> => {
  let { offset, limit }: { limit?: string, offset?: string } = req.query
  if (offset === undefined) offset = '0'
  if (limit === undefined) limit = '100'
  if (parseInt(offset) < 0) offset = '0'
  if (parseInt(limit) < 0 || parseInt(limit) > 100) limit = '100'
  const games: Array<{ title?: string, description?: string }> = []
  const result = await gameModel.find({}).skip(parseInt(offset)).limit(parseInt(limit))
  result.forEach(game => {
    games.push({ title: game.title, description: game.description })
  })
  return res.send(JSON.stringify(games))
}

export const GetGame = async (req: Request, res: Response): Promise<any> => {
  clearBuild()
  const games: string[] = []
  readdirSync(path.join(__dirname, '../../games')).forEach(file => { games.push(file) })
  if (req.query.title === undefined) {
    const response = { successful: false, message: 'Game not specified' }
    return res.send(JSON.stringify(response))
  }
  let index = -1
  for (let i = 0; i < games.length; i++) {
    if (path.parse(games[i]).name === req.query.title) {
      index = i
      break
    }
  }
  if (index === -1) {
    const response = { successful: false, message: 'Game could not be found' }
    return res.send(JSON.stringify(response))
  }
  const response = await decompress(path.join(__dirname, '../../games', games[index]), 'build')
    .then(() => {
      let files: string[] = []
      getFiles('build').forEach(file => {
        if (file.includes('/Build/')) {
          const newPath =
              file.substring(0, file.indexOf('/Build/') + 7) + 'game' + file.slice(file.indexOf('.'))
          renameSync(file, newPath)
          files = [...files, newPath]
        }
      })
      res.sendFile(path.join(__dirname, '../..', files[0]))
      return { successful: true, message: 'Game found' }
    })
    .catch(() => {
      return { successful: false, message: 'Sever error' }
    })
  clearBuild()
  if (!response.successful) return res.send(JSON.stringify(response))
}

export const GetImage = (req: Request, res: Response): void => {
  const images: string[] = []
  readdirSync(path.join(__dirname, '../../images')).forEach(file => { images.push(file) })
  if (req.query.title === undefined) {
    return res.sendFile(path.join(__dirname, '../../images', images[Math.floor(Math.random() * images.length)]))
  } else {
    let index = -1
    for (let i = 0; i < images.length; i++) {
      if (path.parse(images[i]).name === req.query.title) {
        index = i
        break
      }
    }
    if (index === -1) {
      return res.sendFile(path.join(__dirname, '../../images', images[Math.floor(Math.random() * images.length)]))
    } else {
      return res.sendFile(path.join(__dirname, '../../images', images[index]))
    }
  }
}

export const GetInfo = async (req: Request, res: Response): Promise<Response> => {
  let game
  if (req.query.title === undefined) {
    game = (await gameModel.aggregate([{ $sample: { size: 1 } }]))[0]
    await userModel.populate(game, { path: 'creator' })
  } else {
    if (typeof req.query.title === 'string') {
      game = await gameModel.findOne({ title: req.query.title }).populate('creator')
    }
  }
  if (game === null) return res.send(JSON.stringify({ successful: false }))
  const { title, description, creator }:
  { title: string, description: string, creator: { email: string, username: string } } = game
  return res.send(JSON.stringify({ successful: true, title, description, creator: creator.username }))
}

const getFiles = (directory: string): string[] => {
  let files: string[] = []
  const items = readdirSync(directory, { withFileTypes: true })
  for (const item of items) {
    if (item.isDirectory()) {
      files = [...files, ...getFiles(`${directory}/${item.name}`)]
    } else {
      files.push(`${directory}/${item.name}`)
    }
  }
  return files
}

const clearBuild = (): void => {
  if (existsSync(path.join(__dirname, '../../build'))) {
    rmSync(path.join(__dirname, '../../build'), { recursive: true })
  }
}
