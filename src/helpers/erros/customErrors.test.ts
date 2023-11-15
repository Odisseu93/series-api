import customError from './customErrors'

describe('Custom error', () => {
  test('throws a new custom error', () => {
    expect(() => {
      customError('This is a Error message')
    }).toThrow('This is a Error message')
  })
})
