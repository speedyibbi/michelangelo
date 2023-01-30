import express from 'express'
import multer from 'multer'
import { UploadGame, GetGames, GetGame, GetFile } from '../controllers/gameController'
import { isLoggedIn, extendTimeout } from '../utilities/middleware'
import AsyncCatcher from '../utilities/asyncCatcher'
// eslint-disable-next-line new-cap
const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

router.route('/')
  .get(AsyncCatcher(GetGames))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post(isLoggedIn, extendTimeout,
    upload.fields([{ name: 'game', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
    AsyncCatcher(UploadGame))

router.route('/:title')
  .get(AsyncCatcher(GetGame))

router.route('/:title/file')
  .get((AsyncCatcher(GetFile)))

export default router
