export class SeriesDTO {
  public id: string
  public name: string

  constructor({ id, name }: SeriesDTO) {
    this.id = id
    this.name = name
  }
}
