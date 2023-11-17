import {
  RegisterEpisode,
  RegisterSeason,
  RegisterSeries,
} from 'src/factories/types'
import { SeriesDTO, SeasonDTO, EpisodeDTO } from '.'

export interface SeriesFactoryDTO {
  registerSeries({ name }: RegisterSeries): SeriesDTO

  registerSeason({ number, serieId, series }: RegisterSeason): SeasonDTO

  registerEpisode({
    name,
    number,
    seriesId,
    seasonId,
    thumb,
    series,
    season,
  }: RegisterEpisode): EpisodeDTO

  getSeriesData(): string
}
