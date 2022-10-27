import express, { Request, Response } from 'express'
import path from 'path'

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

app.listen(port, () => {
  console.log(`Serving on port ${port != null ? port : ''}`)
})
