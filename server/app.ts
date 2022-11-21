import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import userModel from './user/userModel'
import userRoutes from './user/userRoutes'
import ExpressError from './utilities/expressError'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT
const dbUrl = process.env.DB_URL ?? 'mongodb://localhost:27017/michelangelo'

void mongoose.connect(dbUrl)
mongoose.connection.on('error', console.error.bind(console, '\x1b[1;31m', 'Connection Error: '))
mongoose.connection.once('open', () => console.log('\x1b[1;32m', 'Connected to Database'))

app.use(express.json())
app.use(express.static(path.join(__dirname, '../../client', 'build')))
app.use(session({
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: (1000 * 60 * 60 * 24 * 7)
  }
}))
app.use(passport.initialize())
app.use(passport.session())
// @ts-expect-error
// eslint-disable-next-line new-cap
passport.use(new passportLocal({ usernameField: 'email' }, userModel.authenticate()))
passport.serializeUser(userModel.serializeUser())
passport.deserializeUser(userModel.deserializeUser())

app.get('/', (_req: Request, res: Response) => {
  res.sendFile('index.html')
})

app.use('/user/', userRoutes)

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
