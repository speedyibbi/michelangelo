import { Request, Response } from 'express'
import path from 'path'
import { access, readdir, rename, rm, unlink } from 'fs/promises'
import decompress from 'decompress'
import gameModel from '../models/gameModel'
import userModel from '../models/userModel'

const TestFileName = (input: string): boolean => {
  const dataRegex = /.*\.data/i
  const frameworkRegex = /.*\.framework\.js/i
  const loaderRegex = /.*\.loader\.js/i
  const wasmRegex = /.*\.wasm/i
  return (dataRegex.test(input) || frameworkRegex.test(input) ||
  loaderRegex.test(input) || wasmRegex.test(input))
}

export const UploadGame = async (req: Request, res: Response): Promise<Response> => {
  const { title, description }: { title: string, description: string } = req.body
  // @ts-expect-error
  const gameFile = req.files?.game[0].filename; const imageFile = req.files?.image[0].filename
  const zipPath = path.join(__dirname, '../../games', `${title}${path.extname(gameFile)}`)
  const unzipPath = path.join(__dirname, '../../games', title.replaceAll(/\s/g, '_'))
  const imagePath = path.join(__dirname, '../../images', `_${title}${path.extname(imageFile)}`)
  const renamedImagePath = path.join(__dirname, '../../images', `${title}${path.extname(imageFile)}`)
  let directoryExists = true
  try { await access(unzipPath) } catch { directoryExists = false }
  if (directoryExists) {
    await unlink(zipPath)
    await unlink(imagePath)
    return res.send(JSON.stringify({ successful: false, message: 'Title already exists' }))
  }
  await rename(imagePath, renamedImagePath)
  await decompress(zipPath, unzipPath, {
    filter: file => TestFileName(file.path),
    map: file => {
      const ext = file.path.slice(file.path.indexOf('.'))
      file.path = `${title.replaceAll(/\s/g, '_')}${ext}`
      return file
    },
    strip: 10
  })
  await unlink(zipPath)
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
    .catch(async (error: Error) => {
      await rm(unzipPath, { recursive: true, force: true })
      await unlink(renamedImagePath)
      if (error.message.includes('E11000')) {
        return { successful: false, message: 'Title already exists' }
      } else {
        return { successful: false, message: 'Game could not be uploaded' }
      }
    })
  return res.send(JSON.stringify(response))
}

export const GetGames = async (req: Request, res: Response): Promise<Response> => {
  let { offset, limit }: { limit?: string, offset?: string } = req.query
  if (offset === undefined) offset = '0'
  if (limit === undefined) limit = '100'
  if (parseInt(offset) < 0) offset = '0'
  if (parseInt(limit) < 0 || parseInt(limit) > 100) limit = '100'
  const games: Array<{ id?: string, title?: string, description?: string }> = []
  const result = await gameModel.find({}).skip(parseInt(offset)).limit(parseInt(limit))
  result.forEach(game => {
    games.push({ id: game._id, title: game.title, description: game.description })
  })
  return res.send(JSON.stringify(games))
}

export const GetFile = async (req: Request, res: Response): Promise<void> => {
  let { title, type } = req.query
  if (title === undefined || title === null) return
  if (type === undefined || type === null) return
  title = String(title).replaceAll(/\s/g, '_')
  if (type !== 'loader' && type !== 'data' && type !== 'framework' && type !== 'wasm') return
  let filePath = path.join(__dirname, '../../games', String(title))
  try { await access(filePath) } catch { return }
  filePath = path.join(filePath,
    `${title}.${type}${(type === 'loader' || type === 'framework') ? '.js' : ''}`)
  return res.sendFile(filePath)
}

export const GetImage = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.query
  const images: string[] = []
  const files = await readdir(path.join(__dirname, '../../images')).catch(() => [])
  if (files.length <= 0) return
  files.forEach(file => { images.push(file) })
  if (title === undefined) {
    return res.sendFile(path.join(__dirname, '../../images',
      images[Math.floor(Math.random() * images.length)]))
  } else {
    let index = -1
    for (let i = 0; i < images.length; i++) {
      if (path.parse(images[i]).name === title) {
        index = i
        break
      }
    }
    if (index === -1) {
      return res.sendFile(path.join(__dirname, '../../images',
        images[Math.floor(Math.random() * images.length)]))
    } else {
      return res.sendFile(path.join(__dirname, '../../images', images[index]))
    }
  }
}

export const GetInfo = async (req: Request, res: Response): Promise<Response> => {
  const { title } = req.query
  let game: any = {}
  if (title === undefined || title === null) {
    game = (await gameModel.aggregate([{ $sample: { size: 1 } }]))[0]
    await userModel.populate(game, { path: 'creator' })
  } else {
    game = await gameModel.findOne({ title }).populate('creator')
  }
  if (Object.keys(game).length <= 0) return res.send(JSON.stringify({}))
  game = {
    title: game.title,
    description: game.description,
    creator: game.creator.username
  }
  return res.send(JSON.stringify({ ...game }))
}
