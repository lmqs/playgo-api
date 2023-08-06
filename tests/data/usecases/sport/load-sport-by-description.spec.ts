import { DbLoadSportByDescription } from '@/data/usescases/sport/db-load-sport-by-description'
import { ISportRepository } from '@/data/protocols/db'
import { sportsListMock } from './sport-mock'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'

describe('DbLoadSportById UseCase', () => {
  let sportRepositoryStub: ISportRepository

  beforeEach(() => {
    sportRepositoryStub = new SportPostgresRepository()
  })

  test('Should throw if loadByDescription throws', async () => {
    jest.spyOn(sportRepositoryStub, 'loadByDescription').mockImplementation(() => { throw new Error() })
    const useCase = new DbLoadSportByDescription(sportRepositoryStub)
    const promise = useCase.loadByDescription('any_description')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a sport on success', async () => {
    jest.spyOn(sportRepositoryStub, 'loadByDescription').mockResolvedValueOnce(sportsListMock)

    const useCase = new DbLoadSportByDescription(sportRepositoryStub)

    const account = await useCase.loadByDescription('any_description')
    expect(account).toEqual(sportsListMock)
    expect(sportRepositoryStub.loadByDescription).toHaveBeenCalledWith('any_description')
  })
})
