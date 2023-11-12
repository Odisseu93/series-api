import express from 'express'
import { Request, Response } from 'express'

import dotenv from 'dotenv'

dotenv.config()
const app = express()

const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Series Api!')
})

app.listen(port, () => console.log(` listen on http://localhost:${port}`))
