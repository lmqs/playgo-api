import { mockAddSportParams, mockSportModel } from '@/../tests/domain/mocks/mock-sport'
import { AddSportRepository, LoadSportByDescriptionRepository } from '@/data/usescases/sport'
import { DbAddSport } from '@/data/usescases/sport/db-add-sport'
import { mockAddSportRepository, mockEmptyLoadSportByDescriptionRepository } from '@/tests/data/mocks/mock-db-sport'

type SutTypes = {
  sut: DbAddSport
  addSportRepositoryStub: AddSportRepository
  loadSportByDescriptionRepositoryStub: LoadSportByDescriptionRepository
}

const makeSut = (): SutTypes => {
  const addSportRepositoryStub = mockAddSportRepository()
  const loadSportByDescriptionRepositoryStub = mockEmptyLoadSportByDescriptionRepository()
  const sut = new DbAddSport(addSportRepositoryStub, loadSportByDescriptionRepositoryStub)
  return {
    sut,
    loadSportByDescriptionRepositoryStub,
    addSportRepositoryStub
  }
}

describe('DbAddSport UseCase', () => {
  test('Should call LoadCategoryByTournamentIdRepository with correct values', async () => {
    const { sut, loadSportByDescriptionRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(loadSportByDescriptionRepositoryStub, 'loadByDescription')

    await sut.add(mockAddSportParams())
    expect(addSpy).toHaveBeenCalledWith('any_description')
  })

  test('Should return undefined if loadByDescription not return empty', async () => {
    const { sut, loadSportByDescriptionRepositoryStub } = makeSut()
    jest.spyOn(loadSportByDescriptionRepositoryStub, 'loadByDescription').mockReturnValueOnce(Promise.resolve(mockSportModel()))
    const accessToken = await sut.add(mockAddSportParams())

    expect(accessToken).toBeUndefined()
  })

  test('Should call AddSportRepository with correct values', async () => {
    const { sut, addSportRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSportRepositoryStub, 'add')

    await sut.add(mockSportModel())
    expect(addSpy).toHaveBeenCalledWith({
      id: 'any_id',
      description: 'any_description',
      deleted: false
    })
  })

  test('Should throw if AddSportRepository throws', async () => {
    const { sut, addSportRepositoryStub } = makeSut()
    jest.spyOn(addSportRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(mockSportModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a sport on sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.add(mockAddSportParams())
    expect(account).toEqual(mockSportModel())
  })
})
