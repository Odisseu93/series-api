import { Validation } from '../helpers/validation'
import uuid from '../utils/uuid'

import { EpisodeDTO, SeasonDTO, SeriesDTO } from '../dtos'
import { GetSeriesDataDTO } from '../dtos/getSeriesData.dto'
import { SeriesFactoryDTO } from '../dtos/seriesFactory.dto'
import { RegisterEpisode, RegisterSeason, RegisterSeries } from './types'

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

  private _formatSeassons = (seriesId: string, seasonList: SeasonDTO[]) =>
    seasonList
      .filter((season) => season.serieId === seriesId)
      .map((season) => {
        const episodesData = this._getEpisodesData(season.id)
        return {
          n: season.number,
          episodes: episodesData,
        }
      })

  private _formatEpisodes = (
    currentSeasonId: string,
    episodesList: EpisodeDTO[]
  ) =>
    episodesList
      .filter(({ seasonId }) => seasonId === currentSeasonId)
      .map(({ name, thumb, number: episodeNumber }) => {
        return {
          n: episodeNumber,
          name,
          thumb,
        }
      })

  registerSeries({ name }: RegisterSeries): SeriesDTO {
    const id = uuid()

    validate.required(id, 'id')
    validate.isUUID(id)
    validate.required(name, 'name')

    const data = Object.assign({ id, name }, {}) as SeriesDTO

    const series = new SeriesDTO(data)

    this._series.push(series)

    return series
  }

  registerSeason({ number, seriesId }: RegisterSeason): SeasonDTO {
    const id = uuid()

    validate.required(id, 'id')
    validate.isUUID(id)
    validate.required(number, 'number')
    validate.greaterThanZero(number, 'number')
    validate.required(seriesId, 'serieId')
    validate.isUUID(seriesId)
    validate.seriesExists(this._series, seriesId)

    const seasonData = { id, number, serieId: seriesId } as SeasonDTO

    const season = new SeasonDTO(seasonData)

    this._seasons.push(season)

    return season
  }

  registerEpisode({
    name,
    thumb,
    number,
    seriesId,
    seasonId,
  }: RegisterEpisode): EpisodeDTO {
    const id = uuid()

    validate.required(id, 'id')
    validate.isUUID(id)
    validate.required(number, 'number')
    validate.greaterThanZero(number, 'number')
    validate.required(name, 'name')
    validate.isUUID(seriesId)
    validate.isUUID(seasonId)
    validate.seriesExists(this._series, seriesId)
    validate.seasonExists(this._seasons, seasonId)

    const epsodioData = {
      id,
      name,
      thumb,
      number,
      seriesId,
      seasonId,
    } as EpisodeDTO

    const episode = new EpisodeDTO(epsodioData)

    this._episodes.push(episode)

    return episode
  }

  private _getSeasonsData(seriesId: string) {
    const seasonsData = this._formatSeassons(seriesId, this._seasons)
    return seasonsData
  }

  private _getEpisodesData(seasonId: string) {
    const episodesData = this._formatEpisodes(seasonId, this._episodes)
    return episodesData
  }

  getSeriesData() {
    const seriesData = this._series.map(({ id, name }) => {
      const seasonsData = this._getSeasonsData(id)
      return new GetSeriesDataDTO(id, name, seasonsData)
    })

    return JSON.stringify(seriesData)
  }
}
