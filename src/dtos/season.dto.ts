export class SeasonDTO {
  private _id: string
  private _number: number
  private _serieId: string

  public get id(): string {
    return this._id
  }

  public get number(): number {
    return this._number
  }

  public get serieId(): string {
    return this._serieId
  }

  constructor({ id, number, serieId }: SeasonDTO) {
    this._id = id
    this._number = number
    this._serieId = serieId
  }
}
