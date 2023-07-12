import { LoadTournamentByIdRepository } from '@/data/protocols/db/tournament'
import { DbLoadTournamentById } from '@/data/usescases/tournament/load-tournament-by-id'
import { DateHandler } from '@/infra/gateways/date/date-handler'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { dbLoadByIdMock, loadByIdTournamentObjectMock } from './tournament-mock'

type SutTypes = {
  sut: DbLoadTournamentById
  tournamentRepositoryStub: LoadTournamentByIdRepository
}

const makeSut = (): SutTypes => {
  const tournamentRepositoryStub = new TournamentPostgresRepository()
  const dateHelper = new DateHandler()
  const sut = new DbLoadTournamentById(tournamentRepositoryStub, dateHelper)
  return {
    sut,
    tournamentRepositoryStub
  }
}

describe('DbLoadTournamentById UseCase', () => {
  test('Should call LoadTournamentByIdRepository with correct values', async () => {
    const { sut, tournamentRepositoryStub } = makeSut()
    const loadTournamentByIdRepositorySpy =
      jest.spyOn(tournamentRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(dbLoadByIdMock))

    await sut.load('valid_id')
    expect(loadTournamentByIdRepositorySpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return undefined if LoadTournamentByIdRepository return empty', async () => {
    const { sut, tournamentRepositoryStub } = makeSut()
    jest.spyOn(tournamentRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(undefined))
    const tournament = await sut.load('valid_id')

    expect(tournament).toBeUndefined()
  })

  test('Should throw if loadTournamentByIdRepository throws', async () => {
    const { sut, tournamentRepositoryStub } = makeSut()
    jest.spyOn(tournamentRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.load('valid_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an tournament on success', async () => {
    const { sut, tournamentRepositoryStub } = makeSut()
    jest.spyOn(tournamentRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(dbLoadByIdMock))

    const account = await sut.load('valid_id')
    expect(account).toEqual(loadByIdTournamentObjectMock)
  })
})
