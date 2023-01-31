import { mockSportModel } from '@/tests/domain/mocks/mock-sport'
import { LoadSportByDescription, LoadSportByDescriptionRepository } from '@/data/usescases/sport'
import { mockLoadSportByDescriptionRepository } from '@/tests/data/mocks/mock-db-sport'
import { DbLoadSportByDescription } from '@/data/usescases/sport/db-load-sport-by-description'

type SutTypes = {
  sut: LoadSportByDescription
  loadSportByDescriptionRepositoryStub: LoadSportByDescriptionRepository
}

const makeSut = (): SutTypes => {
  const loadSportByDescriptionRepositoryStub = mockLoadSportByDescriptionRepository()
  const sut = new DbLoadSportByDescription(loadSportByDescriptionRepositoryStub)
  return {
    sut,
    loadSportByDescriptionRepositoryStub
  }
}

describe('DbLoadSportById UseCase', () => {
  test('Should throw if LoadSportByIdRepository throws', async () => {
    const { sut, loadSportByDescriptionRepositoryStub } = makeSut()
    jest.spyOn(loadSportByDescriptionRepositoryStub, 'loadByDescription').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.loadByDescription('any_description')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a sport on sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.loadByDescription('any_description')
    expect(account).toEqual(mockSportModel())
  })
})
