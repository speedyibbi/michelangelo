import { NextFunction, Request, Response } from 'express'
import { join } from 'path'
import { access, mkdir } from 'fs/promises'

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  if (!req.isAuthenticated()) {
    const response = { successful: false, message: 'Need to be logged in first' }
    return res.send(JSON.stringify(response))
  }
  next()
}

export const checkDirectories = async (_req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    await access((join(__dirname, '../../games')))
  } catch {
    await mkdir(join(__dirname, '../../games'), { recursive: true })
  }
  try {
    await access((join(__dirname, '../../images')))
  } catch {
    await mkdir(join(__dirname, '../../images'), { recursive: true })
  }
  next()
}
