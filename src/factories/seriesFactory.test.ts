import { SeriesFactory } from './seriesFactory'
import Ajv from 'ajv'

describe('Test all SeriesFactory methods', () => {
  let factory: SeriesFactory

  beforeAll(() => {
    factory = new SeriesFactory()
  })

  describe('Should be able to add a new series', () => {
    it('When all parameters are provided', () => {
      const input = {
        name: 'Supernatural',
      }

      const sut = factory.registerSeries(input)

      expect(sut).toHaveProperty('id')
      expect(input.name).toEqual(sut.name)
    })
  })

  describe('Should not be able to add a new series', () => {
    it('Throws an error when name is missing', () => {
      expect(() => {
        factory.registerSeries({
          name: '',
        })
      }).toThrow('name is required!')
    })
  })

  describe('Should be able to add seasons of a series', () => {
    it('when all parameters are provided', () => {
      const series = factory.registerSeries({
        name: 'Supernatural',
      })

      const sut = factory.registerSeason({
        seriesId: series.id,
        number: 1,
      })

      expect(sut).toHaveProperty('id' && 'seriesId' && 'number')
      expect(sut).toHaveProperty('id')
      expect(sut.number).toEqual(1)
    })
  })

  describe('Should not be able to add seasons of a series', () => {
    it('when some or all parameters are missing', () => {
      factory.registerSeries({
        name: 'Supernatural',
      })

      expect(() => {
        factory.registerSeason({
          seriesId: '',
          number: 1,
        })
      }).toThrow()

      expect(() => {
        factory.registerSeason({
          seriesId: '',
          number: 0,
        })
      }).toThrow()

      expect(() => {
        factory.registerSeason({
          seriesId: '',
          number: 1,
        })
      }).toThrow()

      expect(() => {
        // @ts-expect-error missing parameters
        factory.registerSeason()
      }).toThrow()
    })
  })

  describe('Should be able to add episodes of a season', () => {
    it('when some or all parameters are missing', () => {
      const series = factory.registerSeries({
        name: 'Supernatural',
      })

      const season = factory.registerSeason({
        seriesId: series.id,
        number: 1,
      })

      const sut = factory.registerEpisode({
        name: 'pilot',
        thumb:
          'https://m.media-amazon.com/images/M/MV5BMzE1Y2M5MWItOTUyNC00MjhlLWE3YWItMTgxNjdiYWEyNjc3XkEyXkFqcGdeQXVyMjg2MTMyNTM@._V1_QL75_UX500_CR0,26,500,281_.jpg',
        number: 1,
        seriesId: series.id,
        seasonId: season.id,
      })

      expect(sut).toHaveProperty(
        'id' && 'name' && 'number' && 'seriesId' && 'seasonId'
      )
    })
  })

  describe('Should not be able to add episodes of a season', () => {
    it('when some or all parameters are missing', () => {
      const series = factory.registerSeries({
        name: 'Supernatural',
      })

      const season = factory.registerSeason({
        seriesId: series.id,
        number: 1,
      })

      expect(() => {
        factory.registerEpisode({
          name: 'pilot',
          number: -10,
          seriesId: series.id,
          seasonId: season.id,
        })
      }).toThrow("The 'number' field needs be greater than zero!")

      expect(() => {
        factory.registerEpisode({
          name: 'pilot',
          number: 1,
          seriesId: '4e46c470-8264-11ee-b962-0242ac120002',
          seasonId: season.id,
        })
      }).toThrow("This TV show doesn't exist!")

      expect(() => {
        factory.registerEpisode({
          name: 'pilot',
          number: 1,
          seriesId: series.id,
          seasonId: '4e46c470-8264-11ee-b962-0242ac120002',
        })
      }).toThrow("This season doesn't exist!")
    })
  })

  describe('It should be possible to retrieve data from the series', () => {
    it('The json is valid', () => {
      const series = factory.registerSeries({
        name: 'Supernatural',
      })

      const season = factory.registerSeason({
        seriesId: series.id,
        number: 1,
      })

      factory.registerEpisode({
        name: 'pilot',
        number: 1,
        seriesId: series.id,
        seasonId: season.id,
      })

      const sut = factory.getSeriesData()

      const ajv = new Ajv()

      const schema = {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            seasons: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  n: { type: 'number' },
                  episodes: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        n: { type: 'number' },
                        name: { type: 'string' },
                        thumb: { type: 'string' },
                      },
                      required: ['n', 'name'],
                    },
                  },
                },
                required: ['n', 'episodes'],
              },
            },
          },
          required: ['id', 'name', 'seasons'],
        },
      }

      const validate = ajv.compile(schema)

      expect(validate(JSON.parse(sut))).toBeTruthy()
    })
  })
})
