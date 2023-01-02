import express from 'express'
import multer from 'multer'
import { UploadGame } from '../controllers/gameController'
import { isLoggedIn } from '../utilities/middleware'
import AsyncCatcher from '../utilities/asyncCatcher'
// eslint-disable-next-line new-cap
const router = express.Router()

const storage = multer.diskStorage({
  destination: (_req, file, callback) => {
    if (file.fieldname === 'game') callback(null, 'games')
    else if (file.fieldname === 'image') callback(null, 'images')
  },
  filename: (req, _file, callback) => {
    callback(null, req.body.title)
  }
})

const upload = multer({ storage })

router.route('/')
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .post(isLoggedIn, upload.fields([{ name: 'game', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
    AsyncCatcher(UploadGame))

export default router
