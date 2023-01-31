import { Request, Response } from 'express'
import path from 'path'
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import decompress from 'decompress'
import gameModel from '../models/gameModel'
import userModel from '../models/userModel'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}

const s3Bucket = process.env.S3_BUCKET
const s3BucketRegion = process.env.S3_BUCKET_REGION
const awsAccessKey = process.env.AWS_ACCESS_KEY
const awsSecretKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: String(awsAccessKey),
    secretAccessKey: String(awsSecretKey)
  },
  region: s3BucketRegion
})

const GenerateS3Url = async (input: string): Promise<string> => {
  const s3Params = {
    Bucket: s3Bucket,
    Key: input
  }
  const command = new GetObjectCommand(s3Params)
  return await getSignedUrl(s3, command, { expiresIn: 3600 })
}

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
  // eslint-disable-next-line new-cap
  const game = await new gameModel({ title, description, image: { type: path.extname(req.files?.image[0].originalname) } })
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
      if (error.message.includes('E11000')) {
        return { successful: false, message: 'Title already exists' }
      } else {
        console.log(error)
        return { successful: false, message: 'Game could not be uploaded' }
      }
    })
  if (response.successful === false) return res.send(JSON.stringify(response))
  // @ts-expect-error
  const extractedFiles = await decompress(req.files?.game[0].buffer, {
    filter: file => TestFileName(file.path),
    map: file => {
      const ext = file.path.slice(file.path.indexOf('.'))
      file.path = `${title.replaceAll(/\s/g, '_')}${ext}`
      return file
    },
    strip: 10
  })
  // @ts-expect-error
  const files = [...extractedFiles, req.files?.image[0]]
  await Promise.all(files.map(async (file) => {
    const s3Params = {
      Bucket: s3Bucket,
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Key: `${title}/${file.path === undefined ? `${title}${path.extname(file.originalname)}` : file.path}`,
      Body: file.data === undefined ? file.buffer : file.data,
      ContentType: 'application/octet-stream'
    }
    const command = new PutObjectCommand(s3Params)
    await s3.send(command)
  }))
  return res.send(JSON.stringify(response))
}

export const GetGames = async (req: Request, res: Response): Promise<Response> => {
  let { offset, limit }: { limit?: string, offset?: string } = req.query
  if (offset === undefined || parseInt(offset) < 0) offset = '0'
  if (limit === undefined || parseInt(limit) < 0 || parseInt(limit) > 100) limit = '100'
  const games: Array<{
    id?: string
    title?: string
    description?: string
    image?: string
    creator?: string }> = []
  const result = await gameModel.find({}).skip(parseInt(offset)).limit(parseInt(limit))
  await Promise.all(result.map(async (game) => {
    const title = String(game.title).replaceAll(/\s/g, '_')
    const url = await GenerateS3Url(`${String(title)}/${String(title)}${String(game.image.type)}`)
    games.push({ id: game._id, title: game.title, description: game.description, image: url, creator: game.creator.username })
  }))
  return res.send(JSON.stringify(games))
}

export const GetGame = async (req: Request, res: Response): Promise<Response> => {
  const { title } = req.params
  let game: any = {}
  if (title !== undefined || title !== null || title !== '') {
    game = await gameModel.findOne({ title }).populate('creator')
  } else {
    return res.send(JSON.stringify({}))
  }
  const imageUrl = await GenerateS3Url(`${String(title.replaceAll(/\s/g, '_'))}/${String(title.replaceAll(/\s/g, '_'))}${String(game.image.type)}`)
  game = {
    id: game._id,
    title: game.title,
    description: game.description,
    image: imageUrl,
    creator: game.creator.username
  }
  return res.send(JSON.stringify(game))
}

export const GetFile = async (req: Request, res: Response): Promise<any> => {
  const title = req.params.title.replaceAll(/\s/g, '_')
  const { type } = req.query
  let key = ''
  if (type === 'data' || type === 'framework' || type === 'loader' || type === 'wasm') {
    if (type === 'data' || type === 'wasm') {
      key = `${title}/${title}.${String(type)}`
    } else {
      key = `${title}/${title}.${String(type)}.js`
    }
  } else {
    console.log('error')
  }
  const s3Params = {
    Bucket: s3Bucket,
    Key: key
  }
  const command = new GetObjectCommand(s3Params)
  const { Body } = await s3.send(command)
  // @ts-expect-error
  return Body.pipe(res)
}
