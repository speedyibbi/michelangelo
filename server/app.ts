import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import apiRoutes from './utilities/apiRoutes'
import ExpressError from './utilities/expressError'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT

app.use(express.static(path.join(__dirname, '../../client', 'build')))

app.get('/', (_req: Request, res: Response) => {
  res.sendFile('index.html')
})

app.use('/api/', apiRoutes)

app.all('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new ExpressError('Page not found', 404))
})

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.message === null) err.message = 'Something went wrong'
  if (err.status === null) err.status = 500
  res.status(err.status).send(err.message)
})

app.listen(port, () => {
  console.log('\x1b[1;36m', `Serving on port ${port != null ? port : ''}`)
})
