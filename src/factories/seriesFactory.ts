import { Validation } from '../helpers/validation'

import { EpisodeDTO, SeasonDTO, SeriesDTO } from '../dtos'
import { GetSeriesDataDTO } from '../dtos/getSeriesData.dto'
import { SeriesFactoryDTO } from '../dtos/seriesFactory.dto'

const validate = new Validation()

export class SeriesFactory implements SeriesFactoryDTO {
  private _series: SeriesDTO[]
  private _seasons: SeasonDTO[]
  private _episodes: EpisodeDTO[]

  constructor() {
    this._series = []
    this._seasons = []
    this._episodes = []
  }

  formatSeassons = (seriesId: string, seriesList: SeasonDTO[]) =>
    seriesList
      .filter(({ id }) => id === seriesId)
      .map(({ id: seasonId, number: seasonNumber }) => {
        const episodesData = this._getEpisodesData(seasonId)
        return {
          n: seasonNumber,
          episodes: episodesData,
        }
      })

  formatEpisodes = (currentSeasonId: string, episodesList: EpisodeDTO[]) =>
    episodesList
      .filter(({ seasonId }) => seasonId === currentSeasonId)
      .map(({ name, number: episodeNumber }) => {
        return {
          n: episodeNumber,
          name,
        }
      })

  registerSeries({ id, name }: SeriesDTO): SeriesDTO {
    validate.required(id, 'id')
    validate.isUUID(id)
    validate.required(name, 'name')

    const data = Object.assign({ id, name }, {}) as SeriesDTO

    const series = new SeriesDTO(data)

    this._series.push(series)

    return series
  }

  registerSeason(data: SeasonDTO, serie: SeriesDTO): SeasonDTO {
    const { id, number, serieId } = data

    validate.required(id, 'id')
    validate.isUUID(id)
    validate.required(number, 'number')
    validate.greaterThanZero(number, 'number')
    validate.required(serieId, 'serieId')
    validate.isUUID(serieId)

    const serieDoesNotExist = !serie['id'].includes(serieId)

    if (serieDoesNotExist) throw new Error("This TV show doesn't exist!")

    const seasonData = { id, number, serieId } as SeasonDTO

    const season = new SeasonDTO(seasonData)

    this._seasons.push(season)

    return season
  }

  registerEpisode(
    props: EpisodeDTO,
    serie: SeriesDTO,
    season: SeasonDTO
  ): EpisodeDTO {
    const { id, name, number, seriesId, seasonId } = props

    validate.required(id, 'id')
    validate.isUUID(id)
    validate.required(number, 'number')
    validate.greaterThanZero(number, 'number')
    validate.required(name, 'name')
    validate.isUUID(seriesId)
    validate.isUUID(seasonId)

    const serieDoesNotExist =
      !serie['id'].includes(seriesId) || !season['id'].includes(seasonId)

    if (serieDoesNotExist)
      throw new Error("This TV show or this season doesn't exist!")

    const epsodioData = { id, name, number, seriesId, seasonId } as EpisodeDTO

    const episode = new EpisodeDTO(epsodioData)

    this._episodes.push(episode)

    return episode
  }

  private _getSeasonsData(seriesId: string) {
    const seasonsData = this.formatSeassons(seriesId, this._seasons)
    return seasonsData
  }

  private _getEpisodesData(seasonId: string) {
    const episodesData = this.formatEpisodes(seasonId, this._episodes)
    return episodesData
  }

  getSeriesData() {
    const seriesData = this._series.map(({ id: seriesId, name }) => {
      const seasonsData = this._getSeasonsData(seriesId)
      return new GetSeriesDataDTO(seriesId, name, seasonsData)
    })

    return JSON.stringify(seriesData)
  }
}
