import { NextFunction, Request, Response } from 'express'

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (!req.isAuthenticated()) {
    const response = { successful: false, message: 'Need to be logged in first' }
    return res.send(JSON.stringify(response))
  }
  next()
}

export const extendTimeout = (_req: Request, res: Response, next: NextFunction): void => {
  res.setTimeout((1000 * 60 * 5), () => { })
  next()
}
