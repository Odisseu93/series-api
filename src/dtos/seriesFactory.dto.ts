import { SeriesDTO, SeasonDTO, EpisodeDTO } from '.'

export interface SeriesFactoryDTO {
  registerSeries(props: SeriesDTO): SeriesDTO

  registerSeason(props: SeasonDTO, serie: SeriesDTO): SeasonDTO

  registerEpisode(
    props: EpisodeDTO,
    serie: SeriesDTO,
    season: SeasonDTO
  ): EpisodeDTO

  getSeriesData(): string
}
