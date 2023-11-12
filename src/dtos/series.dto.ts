export class SeriesDTO {
  private _id: string

  private _name: string

  public get name(): string {
    return this._name
  }

  public get id(): string {
    return this._id
  }

  constructor({ id, name }: SeriesDTO) {
    this._id = id
    this._name = name
  }
}
