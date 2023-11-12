import { EpisodeDTO, SeasonDTO, SeriesDTO } from '../dtos'
import { SeriesFactoryDTO } from '../dtos/seriesFactory.dto'

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
    const data = Object.assign({ id, name }, {}) as SeriesDTO

    if (!id || !name) throw Error('Fill in the id and name of the series!')

    const series = new SeriesDTO(data)

    this._series.push(series)

    return series
  }

  registerSeason(data: SeasonDTO, serie: SeriesDTO): SeasonDTO {
    const { id, number, serieId } = data

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
    const { id, name, number, serieId, seasonId } = props

    const serieDoesNotExist =
      !serie['id'].includes(serieId) || !season['id'].includes(seasonId)

    if (serieDoesNotExist)
      throw new Error("This TV show or this season doesn't exist!")

    const epsodioData = { id, name, number, serieId, seasonId } as EpisodeDTO

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
      return {
        id: seriesId,
        name,
        seasons: seasonsData,
      }
    })

    return JSON.stringify(seriesData)
  }
}
