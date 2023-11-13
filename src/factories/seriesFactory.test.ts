import { SeriesDTO } from 'src/dtos'
import { SeriesFactory } from './seriesFactory'
import Ajv from 'ajv'

describe('Test all SeriesFactory methods', () => {
  let factory: SeriesFactory

  beforeAll(() => (factory = new SeriesFactory()))

  describe('Should be able to add a new series', () => {
    it('When all parameters are provided', () => {
      const input = {
        id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
        name: 'Supernatural',
      }

      const sut = factory.registerSeries(input)

      expect(input.id).toEqual(sut.id)
      expect(input.name).toEqual(sut.name)
    })
  })

  describe('Should not be able to add a new series', () => {
    const missingPropertyError = new Error(
      'Fill in the id and name of the series!'
    )

    it('Throws an error when id is missing', () => {
      expect(() => {
        factory.registerSeries({ id: '', name: 'Test Series' })
      }).toThrow(missingPropertyError)
    })

    it('Throws an error when name is missing', () => {
      expect(() => {
        factory.registerSeries({
          id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
          name: '',
        })
      }).toThrow(missingPropertyError)
    })

    it('Throws an error when id and name is missing', () => {
      expect(() => {
        factory.registerSeries({
          id: '',
          name: '',
        })
      }).toThrow(missingPropertyError)
    })
  })

  describe('Should be able to add seasons of a series', () => {
    it('when all parameters are provided', () => {
      const series = factory.registerSeries({
        id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
        name: 'Supernatural',
      })

      const sut = factory.registerSeason(
        {
          id: '4140c062-7e56-11ee-b962-0242ac120002',
          serieId: series.id,
          number: 1,
        },
        series
      )

      expect(sut).toHaveProperty('id' && 'serieId' && 'number')
      expect(sut.id).toEqual('4140c062-7e56-11ee-b962-0242ac120002')
      expect(sut.serieId).toEqual('634aa6f6-7e3c-11ee-b962-0242ac120002')
      expect(sut.number).toEqual(1)
    })
  })

  describe('Should not be able to add seasons of a series', () => {
    it('when some or all parameters are missing', () => {
      const series = factory.registerSeries({
        id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
        name: 'Supernatural',
      })

      expect(() => {
        factory.registerSeason(
          {
            id: '',
            serieId: series.id,
            number: 1,
          },
          series
        )
      }).toThrow('Missing or invalid property!')

      expect(() => {
        factory.registerSeason(
          {
            id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
            serieId: '',
            number: 1,
          },
          series
        )
      }).toThrow('Missing or invalid property!')

      expect(() => {
        factory.registerSeason(
          {
            id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
            serieId: '',
            number: 0,
          },
          series
        )
      }).toThrow('Missing or invalid property!')

      expect(() => {
        // @ts-expect-error missing parameters
        factory.registerSeason({
          id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
          serieId: '',
          number: 1,
        })
      }).toThrow('Missing or invalid property!')

      expect(() => {
        // @ts-expect-error missing parameters
        factory.registerSeason()
      }).toThrow()
    })
  })

  describe('Should be able to add episodes of a season', () => {
    it('when some or all parameters are missing', () => {
      const series = factory.registerSeries({
        id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
        name: 'Supernatural',
      })

      const season = factory.registerSeason(
        {
          id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
          serieId: series.id,
          number: 1,
        },
        series
      )

      const sut = factory.registerEpisode(
        {
          id: 'fbd3ca84-b1ba-4e39-9346-50a96d297cac',
          name: 'pilot',
          number: 1,
          seriesId: series.id,
          seasonId: season.id,
        },
        series,
        season
      )

      expect(sut).toHaveProperty(
        'id' || 'name' || 'number' || 'seriesId' || 'seasonId'
      )
    })
  })

  describe('Should not be able to add episodes of a season', () => {
    it('when some or all parameters are missing', () => {
      const series = factory.registerSeries({
        id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
        name: 'Supernatural',
      })

      const season = factory.registerSeason(
        {
          id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
          serieId: series.id,
          number: 1,
        },
        series
      )

      expect(() => {
        factory.registerEpisode(
          {
            id: 'fbd3ca84-b1ba-4e39-9346-50a96d297cac',
            name: 'pilot',
            number: -10,
            seriesId: series.id,
            seasonId: season.id,
          },
          series,
          season
        )
      }).toThrow('Missing or invalid property!')

      expect(() => {
        factory.registerEpisode(
          {
            id: 'fbd3ca84-b1ba-4e39-9346-50a96d297cac',
            name: 'pilot',
            number: 1,
            seriesId: '4e46c470-8264-11ee-b962-0242ac120002',
            seasonId: season.id,
          },
          series,
          season
        )
      }).toThrow("This TV show or this season doesn't exist!")

      expect(() => {
        factory.registerEpisode(
          {
            id: 'fbd3ca84-b1ba-4e39-9346-50a96d297cac',
            name: 'pilot',
            number: 1,
            seriesId: series.id,
            seasonId: '4e46c470-8264-11ee-b962-0242ac120002',
          },
          series,
          season
        )
      }).toThrow("This TV show or this season doesn't exist!")
    })
  })

  describe('It should be possible to retrieve data from the series', () => {
    it('when searching for a series by id', () => {
      const series = factory.registerSeries({
        id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
        name: 'Supernatural',
      })

      const season = factory.registerSeason(
        {
          id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
          serieId: series.id,
          number: 1,
        },
        series
      )

      factory.registerEpisode(
        {
          id: 'fbd3ca84-b1ba-4e39-9346-50a96d297cac',
          name: 'pilot',
          number: 1,
          seriesId: series.id,
          seasonId: season.id,
        },
        series,
        season
      )

      const sut = factory.getSeriesData()

      expect(
        JSON.parse(sut).find(({ id }: SeriesDTO) => {
          return id === '634aa6f6-7e3c-11ee-b962-0242ac120002'
        }).id
      ).toEqual(series.id)
    })

    it('The json is valid', () => {
      const series = factory.registerSeries({
        id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
        name: 'Supernatural',
      })

      const season = factory.registerSeason(
        {
          id: '634aa6f6-7e3c-11ee-b962-0242ac120002',
          serieId: series.id,
          number: 1,
        },
        series
      )

      factory.registerEpisode(
        {
          id: 'fbd3ca84-b1ba-4e39-9346-50a96d297cac',
          name: 'pilot',
          number: 1,
          seriesId: series.id,
          seasonId: season.id,
        },
        series,
        season
      )

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
