import { Request, Response } from 'express'
import { Error } from 'mongoose'
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
