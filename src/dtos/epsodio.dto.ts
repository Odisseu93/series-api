export class EpisodeDTO {
  public id: string
  public number: number
  public seasonId: string
  public seriesId: string
  public name: string
  public thumb?: string

  constructor({ id, name, thumb, number, seasonId, seriesId }: EpisodeDTO) {
    this.id = id
    this.name = name
    this.thumb = thumb
    this.number = number
    this.seasonId = seasonId
    this.seriesId = seriesId
  }
}
