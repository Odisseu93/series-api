import express, { Request, Response } from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
import seriesRoutes from '../routes/series.routes'

dotenv.config()
const app = express()

app.use(cors())

app.use('/', seriesRoutes)
// app.get('/', (req: Request, res: Response) => {
//   res.status(200).json('Hello Series API')
// })
//
export { app }
