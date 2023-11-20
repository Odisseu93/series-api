import { Router } from 'express'
import { SeriesController } from '../controllers/series.controller'

const router = Router()

router.get('/', SeriesController.getSeriesByName)

export default router
