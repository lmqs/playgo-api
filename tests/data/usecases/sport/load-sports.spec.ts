import { DbLoadSports } from '@/data/usescases/sport/db-load-sports'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { ISportRepository } from '@/data/protocols/db'
import { sportsListMock } from './sport-mock'

describe('DbLoadSports UseCase', () => {
  let sportRepositoryStub: ISportRepository

  beforeEach(() => {
    sportRepositoryStub = new SportPostgresRepository()
  })

  test('Should throw if LoadSportsRepository throws', async () => {
    jest.spyOn(sportRepositoryStub, 'loadAll').mockImplementation(() => { throw new Error() })
    const useCase = new DbLoadSports(sportRepositoryStub)
    const promise = useCase.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return a sports list on success', async () => {
    jest.spyOn(sportRepositoryStub, 'loadAll').mockResolvedValueOnce(sportsListMock)
    const useCase = new DbLoadSports(sportRepositoryStub)

    const account = await useCase.load()
    expect(account).toEqual(sportsListMock)
  })
})
