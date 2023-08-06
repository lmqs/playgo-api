
import { DbLoadSportById } from '@/data/usescases/sport/db-load-sport-by-id'
import { sportMock } from './sport-mock'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { ISportRepository } from '@/data/protocols/db'

describe('DbLoadSportById UseCase', () => {
  let sportRepositoryStub: ISportRepository

  beforeEach(() => {
    sportRepositoryStub = new SportPostgresRepository()
  })

  test('Should throw if loadById throws', async () => {
    jest.spyOn(sportRepositoryStub, 'loadById').mockImplementation(() => { throw new Error() })
    const useCase = new DbLoadSportById(sportRepositoryStub)

    const promise = useCase.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a sport on success', async () => {
    jest.spyOn(sportRepositoryStub, 'loadById').mockResolvedValueOnce(sportMock)
    const useCase = new DbLoadSportById(sportRepositoryStub)
    const account = await useCase.loadById('any_id')
    expect(account).toEqual(sportMock)
    expect(sportRepositoryStub.loadById).toHaveBeenCalledWith('any_id')
  })
})
