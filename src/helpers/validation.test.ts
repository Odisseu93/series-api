import { Validation } from './validation'

describe('Class for field validation', () => {
  let validate: Validation

  beforeAll(() => (validate = new Validation()))

  it('Test if fild is required', () => {
    expect(validate.required(true, 'boolean')).toBeTruthy()

    expect(validate.required('banana', 'banana')).toBeTruthy()

    expect(() => {
      validate.required(undefined, 'field')
    }).toThrow('field is required!')

    expect(() => {
      validate.required('', 'field')
    }).toThrow('field is required!')
  })

  it('Test name field is valid', () => {
    expect(validate.isValidName('name')).toBeTruthy()

    expect(validate.isValidName('a')).toBeTruthy()

    expect(() => {
      validate.isValidName('')
    }).toThrow('invalid name!')

    expect(() => {
      validate.isValidName('          ')
    }).toThrow('invalid name!')
  })

  it('Tests if id is in UUID format', () => {
    expect(validate.isUUID('921889ca-8329-11ee-b962-0242ac120002')).toBeTruthy()

    expect(() => {
      validate.isUUID('id')
    }).toThrow('The id must be in the UUID format!')
  })

  it('Test whether the given number is greater than zero', () => {
    expect(validate.greaterThanZero(10, 'number')).toBeTruthy()

    expect(() => {
      validate.greaterThanZero(0, 'number')
    }).toThrow("The 'number' field needs be greater than zero!")

    expect(() => {
      validate.greaterThanZero(-10, 'number')
    }).toThrow("The 'number' field needs be greater than zero!")
  })
})
