import { Request, Response } from 'express'
import { Query } from 'express-serve-static-core'
import { addSeries } from '../helpers/addSeries'

import path from 'path'
import fs from 'fs'

interface TypedQuery<T extends Query> extends Request {
  query: T
}

export class SeriesController {
  static async getSeriesByName(
    req: TypedQuery<{ name: string }>,
    res: Response
  ) {
    const { name } = req.query

    const dirpath = path.join(__dirname, `../mock/series/${name}`)

    if (!fs.existsSync(dirpath))
      res.status(404).json({ messge: 'Series not found!' })

    if (name) {
      try {
        const result = addSeries(name, dirpath)

        res
          .status(200)
          .contentType('json')
          .send(await result)
      } catch (error: any) {
        res.status(500).json({ message: error.message })
      }
    }
  }
}
