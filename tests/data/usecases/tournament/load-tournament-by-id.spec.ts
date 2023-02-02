import { mockTournamentModel } from '@/../tests/domain/mocks'
import { LoadTournamentByIdRepository } from '@/data/protocols/db/tournament'
import { DbLoadTournamentById } from '@/data/usescases/tournament/load-tournament-by-id'
import { mockLoadTournamentByIdRepository } from '../../mocks'

type SutTypes = {
  sut: DbLoadTournamentById
  loadTournamentByIdRepositoryStub: LoadTournamentByIdRepository
}

const makeSut = (): SutTypes => {
  const loadTournamentByIdRepositoryStub = mockLoadTournamentByIdRepository()
  const sut = new DbLoadTournamentById(loadTournamentByIdRepositoryStub)
  return {
    sut,
    loadTournamentByIdRepositoryStub
  }
}

describe('DbLoadTournamentById UseCase', () => {
  test('Should call LoadTournamentByIdRepository with correct values', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    const loadTournamentByIdRepositorySpy = jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById')

    await sut.load('valid_id')
    expect(loadTournamentByIdRepositorySpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return undefined if LoadTournamentByIdRepository return empty', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => { resolve(undefined) }))
    const tournament = await sut.load('valid_id')

    expect(tournament).toBeUndefined()
  })

  test('Should throw if loadTournamentByIdRepository throws', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.load('valid_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an tournament on Sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.load('valid_id')
    expect(account).toEqual(mockTournamentModel())
  })
})
