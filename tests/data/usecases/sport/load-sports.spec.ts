import { mockSportAllModel } from '@/tests/domain/mocks/mock-sport'
import { LoadSports, LoadSportsRepository } from '@/data/usescases/sport'
import { mockLoadSportsRepository } from '@/tests/data/mocks/mock-db-sport'
import { DbLoadSports } from '@/data/usescases/sport/db-load-sports'

type SutTypes = {
  sut: LoadSports
  loadSportsRepositoryStub: LoadSportsRepository
}

const makeSut = (): SutTypes => {
  const loadSportsRepositoryStub = mockLoadSportsRepository()
  const sut = new DbLoadSports(loadSportsRepositoryStub)
  return {
    sut,
    loadSportsRepositoryStub
  }
}

describe('DbLoadSports UseCase', () => {
  test('Should throw if LoadSportsRepository throws', async () => {
    const { sut, loadSportsRepositoryStub } = makeSut()
    jest.spyOn(loadSportsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return a sports on Sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.load()
    expect(account).toEqual(mockSportAllModel())
  })
})
