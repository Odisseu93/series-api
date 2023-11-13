type EpisodesData = {
  n: number
  name: string
}

type SeasonData = {
  n: number
  episodes: EpisodesData[]
}

export class GetSeriesDataDTO {
  public id: string
  public name: string
  public seasons: SeasonData[]

  constructor(id: string, name: string, seasons: SeasonData[]) {
    this.id = id
    this.name = name
    this.seasons = seasons
  }
}
