import { NextFunction, Request, Response } from 'express'
import userModel from '../models/userModel'
import { faker } from '@faker-js/faker'

export const CurrentUser = (req: Request, res: Response): Response => {
  if (req.isAuthenticated()) {
    const user = JSON.parse(JSON.stringify(req.user))
    const response = { email: user.email, username: user.username }
    return res.send(JSON.stringify(response))
  } else {
    const response = {}
    return res.send(JSON.stringify(response))
  }
}

export const Register = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body
  // eslint-disable-next-line no-useless-escape
  if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    const response = { successful: false, message: 'Enter valid email' }
    return res.send(JSON.stringify(response))
  }
  const username = (faker.color.human() + faker.animal.type() + faker.random.numeric(10)).replace(/ /g, '')
  // eslint-disable-next-line new-cap
  const user = new userModel({ email, username })
  const response = await userModel.register(user, password)
    .then(() => {
      return { successful: true, message: 'Successful registeration!' }
    })
    .catch((error) => {
      return { successful: false, message: (error.message).replace('username', 'email') }
    })
  return res.send(JSON.stringify(response))
}

export const Login = (_req: Request, res: Response): Response => {
  const response = { successful: true, message: 'Successfully logged in!' }
  return res.send(JSON.stringify(response))
}

export const Logout = (req: Request, res: Response, next: NextFunction): Response => {
  req.logout((error) => {
    if (error !== undefined && error !== null) next(error)
  })
  const response = { successful: true, message: 'Goodbye :(' }
  return res.send(JSON.stringify(response))
}
