import { serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadSportsController } from '@/presentation/controllers/sport'
import { DbLoadSports } from '@/data/usescases/sport/db-load-sports'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { sportsMock } from './sport-mock'
import { LoadSports } from '@/domain/usecases/sport'
import { ISportRepository } from '@/data/protocols/db'

describe('Sport Controller', () => {
  let loadSportUseCaseStub: LoadSports
  let sportRepositoryStub: ISportRepository
  beforeEach(() => {
    sportRepositoryStub = new SportPostgresRepository()
    loadSportUseCaseStub = new DbLoadSports(sportRepositoryStub)
  })

  test('Should return 500 if AddSport throws', async () => {
    const controller = new LoadSportsController(loadSportUseCaseStub)
    jest.spyOn(loadSportUseCaseStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(loadSportUseCaseStub, 'load').mockResolvedValueOnce(sportsMock)

    const controller = new LoadSportsController(loadSportUseCaseStub)
    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(ok(sportsMock))
  })

  test('Should return 204 if load sport is empty array', async () => {
    jest.spyOn(loadSportUseCaseStub, 'load').mockResolvedValueOnce([])

    const controller = new LoadSportsController(loadSportUseCaseStub)
    const httpResponse = await controller.handle()
    expect(httpResponse).toEqual(noContent())
  })
})
