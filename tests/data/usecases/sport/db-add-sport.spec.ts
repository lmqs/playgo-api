import { ISportRepository } from '@/data/protocols/db'
import { DbAddSport } from '@/data/usescases/sport/db-add-sport'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { addParamsMock, sportMock, sportsListMock } from './sport-mock'

describe('DbAddSport UseCase', () => {
  let sportRepositoryStub: ISportRepository

  beforeEach(() => {
    sportRepositoryStub = new SportPostgresRepository()
  })

  test('Should return undefined if loadByDescription not return empty', async () => {
    jest.spyOn(sportRepositoryStub, 'loadByDescription').mockResolvedValueOnce(sportsListMock)
    jest.spyOn(sportRepositoryStub, 'add')
    const useCase = new DbAddSport(sportRepositoryStub)
    const result = await useCase.add(addParamsMock)

    expect(result).toBeUndefined()
    expect(sportRepositoryStub.loadByDescription).toHaveBeenCalledWith('tennis')
    expect(sportRepositoryStub.add).toHaveBeenCalledTimes(0)
  })

  test('Should throw if add throws', async () => {
    jest.spyOn(sportRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    jest.spyOn(sportRepositoryStub, 'add').mockImplementation(() => { throw new Error() })
    const useCase = new DbAddSport(sportRepositoryStub)

    const promise = useCase.add(addParamsMock)
    await expect(promise).rejects.toThrow()
    expect(sportRepositoryStub.loadByDescription).toHaveBeenCalledWith('tennis')
    expect(sportRepositoryStub.add).toHaveBeenCalledWith(addParamsMock)
  })

  test('Should return a sport on success', async () => {
    jest.spyOn(sportRepositoryStub, 'loadByDescription').mockResolvedValueOnce([])
    jest.spyOn(sportRepositoryStub, 'add').mockResolvedValueOnce(sportMock)
    const useCase = new DbAddSport(sportRepositoryStub)

    const result = await useCase.add(addParamsMock)
    expect(result).toEqual(sportMock)
    expect(sportRepositoryStub.add).toHaveBeenCalledWith(addParamsMock)
  })
})
