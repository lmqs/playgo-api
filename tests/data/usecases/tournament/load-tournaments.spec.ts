import { mockLoadTournamentsModel } from '@/tests/domain/mocks'
import { LoadTournamentsRepository } from '@/data/protocols/db/tournament'
import { DbLoadTournaments } from '@/data/usescases/tournament/load-tournaments'
import { mockLoadTournamentsRepository } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadTournaments
  loadTournamentsRepositoryStub: LoadTournamentsRepository
}

const makeSut = (): SutTypes => {
  const loadTournamentsRepositoryStub = mockLoadTournamentsRepository()
  const sut = new DbLoadTournaments(loadTournamentsRepositoryStub)
  return {
    sut,
    loadTournamentsRepositoryStub
  }
}

describe('DbLoadTournaments UseCase', () => {
  test('Should return undefined if LoadTournamentByIdRepository return empty', async () => {
    const { sut, loadTournamentsRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentsRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.resolve(undefined))
    const tournaments = await sut.load()

    expect(tournaments).toBeUndefined()
  })

  test('Should throw if loadTournamentsRepository throws', async () => {
    const { sut, loadTournamentsRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentsRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })

  test('Should return a tournament list on sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.load()
    expect(account).toEqual(mockLoadTournamentsModel())
  })
})
