import { DbLoadTournamentById } from '@/data/usescases/tournament/load-tournament-by-id'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { loadByIdTournamentObjectMock } from './tournament-mock'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'

describe('DbLoadTournamentById UseCase', () => {
  let tournamentRepositoryStub: ITournamentRepository
  beforeEach(() => {
    tournamentRepositoryStub = new TournamentPostgresRepository()
  })

  test('Should call LoadTournamentByIdRepository with correct values', async () => {
    const useCase = new DbLoadTournamentById(tournamentRepositoryStub)

    const loadTournamentByIdRepositorySpy =
      jest.spyOn(tournamentRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(loadByIdTournamentObjectMock))

    await useCase.load('valid_id')
    expect(loadTournamentByIdRepositorySpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return undefined if LoadTournamentByIdRepository return empty', async () => {
    const useCase = new DbLoadTournamentById(tournamentRepositoryStub)
    jest.spyOn(tournamentRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(undefined))
    const result = await useCase.load('valid_id')

    expect(result).toBeUndefined()
  })

  test('Should throw if loadTournamentByIdRepository throws', async () => {
    const useCase = new DbLoadTournamentById(tournamentRepositoryStub)
    jest.spyOn(tournamentRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = useCase.load('valid_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an tournament on success', async () => {
    const useCase = new DbLoadTournamentById(tournamentRepositoryStub)
    jest.spyOn(tournamentRepositoryStub, 'loadById').mockReturnValueOnce(Promise.resolve(loadByIdTournamentObjectMock))

    const result = await useCase.load('valid_id')
    expect(result).toEqual(loadByIdTournamentObjectMock)
  })
})
