export class EpisodeDTO {
  public id: string
  public number: number
  public seasonId: string
  public seriesId: string
  public name: string

  constructor({ id, name, number, seasonId, seriesId: serieId }: EpisodeDTO) {
    this.id = id
    this.name = name
    this.number = number
    this.seasonId = seasonId
    this.seriesId = serieId
  }
}
