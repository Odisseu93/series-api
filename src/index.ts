import express from 'express'

import dotenv from 'dotenv'
import seriesRoutes from './routes/series.routes'

dotenv.config()
const app = express()

const port = process.env.PORT || 3000

app.use('/', seriesRoutes)

app.listen(port, () => console.log(` listen on http://localhost:${port}`))
