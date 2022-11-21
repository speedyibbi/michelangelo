import express from 'express'
import passport from 'passport'

import { Register, Login, Logout, CurrentUser } from './userController'
import AsyncCatcher from '../utilities/asyncCatcher'
// import { isLoggedIn } from '../utilities/middleware'
// eslint-disable-next-line new-cap
const router = express.Router()

router.route('/')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get(CurrentUser)

router.route('/register')
  .post(AsyncCatcher(Register))

router.route('/login')
  .post(passport.authenticate('local', { failureMessage: false }), Login)

router.route('/logout')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .get(Logout)

export default router
