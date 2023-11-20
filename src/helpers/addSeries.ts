import { getEpisodesData } from './getEpisodesData'
import { findSeasonNumberByFilename } from './findSeasonNumberByFilename'

import { SeriesFactory } from '../factories/seriesFactory'
import { jsonToObjet } from '../utils/jsonToObjet'
import { color } from '../utils/nodeColors'
import { EpisodeDTO } from 'src/dtos'

export const addSeries = async (name: string, episodesDirPath: string) => {
  const factory = new SeriesFactory()

  return await getEpisodesData(episodesDirPath).then((files: any) => {
    console.group(color.fgWhite, name)
    console.log(color.fgCyan)
    console.log('Registering the series...')

    const series = factory.registerSeries({
      name: name,
    })

    if (!series.id)
      throw new Error(
        'An unexpected error occurred while registering the series!'
      )
    else console.log(' Series registered successfully!\n')

    type Seasons = [
      {
        number: number
        id: string
      },
    ]

    const seasons: Seasons = [{}] as Seasons

    console.log('Registering the seasons...')
    ;(function registeAllseasons() {
      for (let i = 0; i < files.length; i++) {
        const registredSeason = factory.registerSeason({
          number: i + 1,
          seriesId: series.id,
        })

        seasons.push({
          number: registredSeason.number,
          id: registredSeason.id,
        })
      }
    })()

    if (seasons.length < 1)
      throw new Error(
        'An unexpected error occurred while registering the series!'
      )

    console.log(' All seasons registered successfully!\n')

    files.map((file: string) => {
      const episodeSeasonNumber = findSeasonNumberByFilename(
        jsonToObjet(file).filename
      )

      const episodes: EpisodeDTO[] = jsonToObjet(file).fileContent.episodes

      const season = seasons.find(
        (season) => season.number === episodeSeasonNumber
      )

      if (season) {
        console.log(`Registering all episodes of season ${season.number}...`)

        episodes.map((episode: EpisodeDTO) => {
          factory.registerEpisode({
            name: episode.name,
            number: episode.number,
            thumb: episode.thumb,
            seriesId: series.id,
            seasonId: season.id,
          })
        })

        console.log(' All episodes registered successfully!\n')
      }
    })

    console.groupEnd()

    return factory.getSeriesData()
  })
}
