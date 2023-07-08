
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { mockCitiesModel, mockCityModel } from './city-repository-mock'

describe('City Postgres Repository', () => {
  describe('loadById()', () => {
    test('Should return a city on loadById success', async () => {
      const cityRepository = new CityPostgresRepository()
      cityRepository.findGeneric = jest.fn().mockReturnValue([mockCityModel])

      const city = await cityRepository.loadById('any_id')
      expect(city).toEqual({
        id: 'any_id',
        name: 'any_name',
        codeIbge: 'any_code',
        stateId: 'any_stateId',
        gentilic: 'any_gentilic',
        deleted: true,
        area: 'any'
      })
    })

    test('Should return undefined if loadById fails', async () => {
      const cityRepository = new CityPostgresRepository()

      cityRepository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = cityRepository.loadById('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadAll()', () => {
    test('Should return a city on loadAll success', async () => {
      const cityRepository = new CityPostgresRepository()

      cityRepository.findAll = jest.fn().mockReturnValue(mockCitiesModel)

      const city = await cityRepository.loadAll()
      expect(city).toEqual([{
        id: 'any_id',
        name: 'any_name',
        codeIbge: 'any_code',
        stateId: 'any_stateId',
        gentilic: 'any_gentilic',
        deleted: true,
        area: 'any'
      },
      {
        id: 'any_other_id',
        name: 'any_name',
        codeIbge: 'any_code',
        stateId: 'any_stateId',
        gentilic: 'any_gentilic',
        deleted: true,
        area: 'any'
      }])
    })

    test('Should return undefined if loadAll fails', async () => {
      const cityRepository = new CityPostgresRepository()

      cityRepository.findAll = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = cityRepository.loadAll()
      await expect(promise).rejects.toThrow()
    })
  })
})
