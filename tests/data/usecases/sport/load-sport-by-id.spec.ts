import { mockSportModel } from '@/tests/domain/mocks/mock-sport'
import { LoadSportById } from '@/data/usescases/sport'
import { mockLoadSportByIdRepository } from '@/tests/data/mocks/mock-db-sport'
import { DbLoadSportById } from '@/data/usescases/sport/db-load-sport-by-id'

type SutTypes = {
  sut: LoadSportById
  loadSportByIdRepositoryStub: LoadSportById
}

const makeSut = (): SutTypes => {
  const loadSportByIdRepositoryStub = mockLoadSportByIdRepository()
  const sut = new DbLoadSportById(loadSportByIdRepositoryStub)
  return {
    sut,
    loadSportByIdRepositoryStub
  }
}

describe('DbLoadSportById UseCase', () => {
  test('Should throw if LoadSportByIdRepository throws', async () => {
    const { sut, loadSportByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSportByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return a sport on Sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.loadById('any_id')
    expect(account).toEqual(mockSportModel())
  })
})
