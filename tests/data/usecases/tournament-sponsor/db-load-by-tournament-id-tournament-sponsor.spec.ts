import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { addResultTournamentSponsorModelMock } from './tournament-sponsor-mock'
import { LoadByTournamentIdTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor/db-load-by-tournament-id-tournament-sponsor'

describe('LoadByIdTournamentSponsor UseCase', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
  })

  test('Should returns empty array if is not exists in database', async () => {
    const loadByTournamentIdSpy = jest.spyOn(tournamentSponsorRepo, 'loadByTournamentId').mockResolvedValueOnce([])

    const loadByTournamentIdTournamentSponsorUseCase = new LoadByTournamentIdTournamentSponsorUseCase(tournamentSponsorRepo)
    const result = await loadByTournamentIdTournamentSponsorUseCase.loadByTournamentId('id')
    expect(result.length).toBe(0)
    expect(loadByTournamentIdSpy).toHaveBeenCalledWith('id')
  })

  test('Should throw if tournamentSponsorRepository.loadByTournamentId throws', async () => {
    const loadByTournamentIdTournamentSponsorUseCase = new LoadByTournamentIdTournamentSponsorUseCase(tournamentSponsorRepo)
    jest.spyOn(tournamentSponsorRepo, 'loadByTournamentId').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = loadByTournamentIdTournamentSponsorUseCase.loadByTournamentId('id')
    await expect(promise).rejects.toThrow()
  })

  test('Should returns a tournamentSponsor array if success', async () => {
    const loadByTournamentIdSpy = jest.spyOn(tournamentSponsorRepo, 'loadByTournamentId').mockResolvedValueOnce(
      [addResultTournamentSponsorModelMock]
    )

    const loadByTournamentIdTournamentSponsorUseCase = new LoadByTournamentIdTournamentSponsorUseCase(tournamentSponsorRepo)
    await loadByTournamentIdTournamentSponsorUseCase.loadByTournamentId('id')
    expect(loadByTournamentIdSpy).toHaveBeenCalledWith('id')
  })
})
