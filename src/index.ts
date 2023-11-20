import express, { Request, Response } from 'express'

import dotenv from 'dotenv'
import seriesRoutes from './routes/series.routes'

dotenv.config()
const app = express()

const port = process.env.PORT || 3000

app.use('/series-api', seriesRoutes)

app.get('/', (req: Request, res: Response) => res.send('Hello Series API!'))

app.listen(port, () => console.log(` listen on http://localhost:${port}`))
