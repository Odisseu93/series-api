import { EpisodeDTO, SeasonDTO, SeriesDTO } from '../dtos'
import { GetSeriesDataDTO } from '../dtos/getSeriesData.dto'
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
    if (!id || !name) throw new Error('Fill in the id and name of the series!')

    const data = Object.assign({ id, name }, {}) as SeriesDTO

    const series = new SeriesDTO(data)

    this._series.push(series)

    return series
  }

  registerSeason(data: SeasonDTO, serie: SeriesDTO): SeasonDTO {
    const { id, number, serieId } = data

    if (!id || id == '' || number <= 0 || !serieId || serieId == '')
      throw Error('Missing or invalid property!')

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

    if (
      !id ||
      id == '' ||
      !name ||
      name === '' ||
      number <= 0 ||
      !seriesId ||
      seriesId === '' ||
      !seasonId ||
      seasonId === ''
    )
      throw Error('Missing or invalid property!')

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
