import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import mongoose from 'mongoose'
import session from 'express-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import mongoSanitize from 'express-mongo-sanitize'
import mongoStore from 'connect-mongo'
import userModel from './models/userModel'
import userRoutes from './routes/userRoutes'
import gameRoutes from './routes/gameRoutes'
import ExpressError from './utilities/expressError'

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT ?? 5000
const dbUrl = process.env.DB_URL ?? 'mongodb://localhost:27017/michelangelo'

void mongoose.connect(dbUrl)
mongoose.connection.on('error', console.error.bind(console, '\x1b[1;31m', 'Connection Error: '))
mongoose.connection.once('open', () => console.log('\x1b[1;32m', 'Connected to Database'))

app.use(express.static(path.join(__dirname, '../../client/build')))
app.use(mongoSanitize())
app.use(session({
  store: mongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: (60 * 60 * 24),
    crypto: {
      secret: process.env.SECRET ?? 'secret'
    }
  }).on('error', (error) => console.log('\x1b[1;31m', 'Session store error', error)),
  name: 'mikey_',
  secret: process.env.SECRET ?? 'secret',
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

app.use('/users/', userRoutes)
app.use('/games/', gameRoutes)

app.all('*', (_req: Request, _res: Response, next: NextFunction) => {
  next(new ExpressError('Page not found', 404))
})

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.message === undefined || err.message === null) err.message = 'Something went wrong'
  if (err.message === undefined || err.status === null) err.status = 500
  console.log(err.message)
  res.status(err.status).send(err.message)
})

app.listen(port, () => {
  console.log('\x1b[1;36m', `Serving on port ${port != null ? port : ''}`)
})
