import express from 'express'
import path from 'path'
import multer from 'multer'
import { UploadGame, GetGames, GetFile, GetImage, GetInfo } from '../controllers/gameController'
import { isLoggedIn, checkDirectories } from '../utilities/middleware'
import AsyncCatcher from '../utilities/asyncCatcher'
// eslint-disable-next-line new-cap
const router = express.Router()

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    if (file.fieldname === 'game') callback(null, 'games')
    else if (file.fieldname === 'image') callback(null, 'images')
  },
  filename: (req, file, callback) => {
    if (file.fieldname === 'game') {
      callback(null, `${String(req.body.title)}${path.extname(file.originalname)}`)
    } else if (file.fieldname === 'image') {
      callback(null, `_${String(req.body.title)}${path.extname(file.originalname)}`)
    }
  }
})

const upload = multer({ storage })

router.route('/')
  .get(AsyncCatcher(GetGames))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post(isLoggedIn, checkDirectories, upload.fields([{ name: 'game', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
    AsyncCatcher(UploadGame))

router.route('/info')
  .get(AsyncCatcher(GetInfo))

router.route('/image')
  .get(AsyncCatcher(GetImage))

router.route('/file')
  .get(AsyncCatcher(GetFile))

export default router
