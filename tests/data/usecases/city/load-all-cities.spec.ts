import { ICityRepository } from '@/data/protocols/db/city-repository'
import { DbLoadCitiesUseCase } from '@/data/usescases/city'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { citiesMock } from './city-mock'

jest.mock('@/infra/database/postgres/city/city-repository')

describe('DbLoadCategories UseCase', () => {
  let cityRepository: ICityRepository

  beforeEach(async () => {
    cityRepository = new CityPostgresRepository()
  })

  test('Should return empty array if loadAll return empty', async () => {
    const loadCitiesUseCase = new DbLoadCitiesUseCase(cityRepository)
    jest.spyOn(cityRepository, 'loadAll').mockReturnValueOnce(new Promise(resolve => { resolve([]) }))
    const cities = await loadCitiesUseCase.load()

    expect(cities).toStrictEqual([])
  })

  test('Should throw if loadAll throws', async () => {
    const loadCitiesUseCase = new DbLoadCitiesUseCase(cityRepository)
    jest.spyOn(cityRepository, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = loadCitiesUseCase.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return a cities list if success', async () => {
    jest.spyOn(cityRepository, 'loadAll').mockReturnValueOnce(Promise.resolve(citiesMock))

    const loadCitiesUseCase = new DbLoadCitiesUseCase(cityRepository)

    const cities = await loadCitiesUseCase.load()
    expect(cities).toEqual(citiesMock)
  })
})
