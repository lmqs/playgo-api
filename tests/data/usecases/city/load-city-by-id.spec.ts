import { ICityRepository } from '@/data/protocols/db/city-repository'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { cityMock } from './city-mock'
import { DbLoadCityByIdUseCase } from '@/data/usescases/city'

jest.mock('@/infra/database/postgres/city/city-repository')

describe('DbLoadCategories UseCase', () => {
  let cityRepository: ICityRepository

  beforeEach(async () => {
    cityRepository = new CityPostgresRepository()
  })

  test('Should return empty array if loadById return undefined', async () => {
    const loadCityByIdUseCase = new DbLoadCityByIdUseCase(cityRepository)
    jest.spyOn(cityRepository, 'loadById')
    const city = await loadCityByIdUseCase.load('valid_id')

    expect(city).toBeUndefined()
  })

  test('Should throw if loadById throws', async () => {
    const loadCityByIdUseCase = new DbLoadCityByIdUseCase(cityRepository)
    jest.spyOn(cityRepository, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = loadCityByIdUseCase.load('valid_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a city list if success', async () => {
    jest.spyOn(cityRepository, 'loadById').mockReturnValueOnce(Promise.resolve(cityMock))

    const loadCityByIdUseCase = new DbLoadCityByIdUseCase(cityRepository)

    const city = await loadCityByIdUseCase.load('valid_id')
    expect(city).toEqual(cityMock)
  })
})
