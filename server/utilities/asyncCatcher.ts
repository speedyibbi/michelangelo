import { Request, Response, NextFunction } from 'express'
import ExpressError from './expressError'

export = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next)
      .catch((error: Error) => {
        next(new ExpressError(error.message, 500))
      })
  }
}
