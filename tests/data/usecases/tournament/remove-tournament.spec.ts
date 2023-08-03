import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { DbRemoveTournament } from '@/data/usescases/tournament'

describe('Remove Tournament UseCase', () => {
  let tournamentsRepositoryStub: ITournamentRepository

  beforeEach(() => {
    tournamentsRepositoryStub = new TournamentPostgresRepository()
  })

  test('Should throw if remove throws', async () => {
    const useCase = new DbRemoveTournament(tournamentsRepositoryStub)
    jest.spyOn(tournamentsRepositoryStub, 'remove').mockImplementation(() => { throw new Error() })

    const promise = useCase.remove('1')
    await expect(promise).rejects.toThrow()
  })

  test('Should call remove on success', async () => {
    jest.spyOn(tournamentsRepositoryStub, 'remove').mockResolvedValueOnce(undefined)

    const useCase = new DbRemoveTournament(tournamentsRepositoryStub)

    await useCase.remove('1')
    expect(tournamentsRepositoryStub.remove).toHaveBeenCalledTimes(1)
    expect(tournamentsRepositoryStub.remove).toHaveBeenCalledWith('1')
  })
})
