export class EpisodeDTO {
  private _id: string
  private _number: number
  private _seasonId: string
  private _serieId: string
  private _name: string

  get id(): string {
    return this._id
  }
  get number(): number {
    return this._number
  }
  get name(): string {
    return this._name
  }
  get serieId(): string {
    return this._serieId
  }
  get seasonId(): string {
    return this._seasonId
  }

  constructor({ id, name, number, seasonId, serieId }: EpisodeDTO) {
    this._id = id
    this._name = name
    this._number = number
    this._seasonId = seasonId
    this._serieId = serieId
  }
}
