export class SeasonDTO {
  public id: string
  public number: number
  public serieId: string

  constructor({ id, number, serieId }: SeasonDTO) {
    this.id = id
    this.number = number
    this.serieId = serieId
  }
}
