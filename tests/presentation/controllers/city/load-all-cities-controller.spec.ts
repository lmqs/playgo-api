import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadAllCitiesController } from '@/presentation/controllers/city'
import { ILoadAllCities } from '@/domain/usecases/city/load-cities'
import { DbLoadCitiesUseCase } from '@/data/usescases/city'
import { ICityRepository } from '@/data/protocols/db/city-repository'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { citiesMock } from './city-mock'

jest.mock('@/infra/database/postgres/city/city-repository')

describe('LoadAllCities Controller', () => {
  let cityRepository: ICityRepository
  let loadCitiesUseCase: ILoadAllCities

  beforeEach(() => {
    cityRepository = new CityPostgresRepository()
    loadCitiesUseCase = new DbLoadCitiesUseCase(cityRepository)
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('Should return 500 if load throws', async () => {
    const controller = new LoadAllCitiesController(loadCitiesUseCase)
    jest.spyOn(loadCitiesUseCase, 'load').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 204 if load returns empty', async () => {
    const controller = new LoadAllCitiesController(loadCitiesUseCase)
    jest.spyOn(loadCitiesUseCase, 'load').mockReturnValueOnce(Promise.resolve([]))

    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(loadCitiesUseCase, 'load').mockReturnValueOnce(Promise.resolve(citiesMock))

    const controller = new LoadAllCitiesController(loadCitiesUseCase)
    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(ok(citiesMock))
  })
})
