import express from 'express'
import path from 'path'
import multer from 'multer'
import { UploadGame, GetGames, GetGame, GetImage, GetInfo } from '../controllers/gameController'
import { isLoggedIn } from '../utilities/middleware'
import AsyncCatcher from '../utilities/asyncCatcher'
// eslint-disable-next-line new-cap
const router = express.Router()

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    if (file.fieldname === 'game') callback(null, 'games')
    else if (file.fieldname === 'image') callback(null, 'images')
  },
  filename: (req, file, callback) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    callback(null, req.body.title + path.parse(file.originalname).ext)
  }
})

const upload = multer({ storage })

router.route('/')
  .get(AsyncCatcher(GetGames))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post(isLoggedIn, upload.fields([{ name: 'game', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
    AsyncCatcher(UploadGame))

router.route('/info')
  .get(AsyncCatcher(GetInfo))

router.route('/image')
  .get(GetImage)

router.route('/file')
  .get(GetGame)

export default router
