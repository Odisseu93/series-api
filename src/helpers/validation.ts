import customError from './erros/customErrors'

export class Validation {
  required(value: unknown, valueName: string) {
    if (typeof value === 'boolean') return true
    if (!value || value === undefined) customError(`${valueName} is required!`)
    return true
  }

  isUUID(value: string) {
    const reg =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

    if (!reg.test(value)) customError('The id must be in the UUID format!')
    return true
  }

  isValidName(value: string) {
    if (value.trim().length === 0) customError('invalid name!')
    return true
  }

  greaterThanZero(value: number, fieldName: string) {
    if (value <= 0)
      customError(`The '${fieldName}' field needs be greater than zero!`)
    return true
  }
}
