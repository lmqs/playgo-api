import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { LoadByIdTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor/db-load-by-id-tournament-sponsor'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { addResultTournamentSponsorModelMock } from './tournament-sponsor-mock'

describe('LoadByIdTournamentSponsor UseCase', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
  })

  test('Should returns undefined if is not exists in database', async () => {
    const loadByIdSpy = jest.spyOn(tournamentSponsorRepo, 'loadById').mockResolvedValueOnce(undefined)

    const loadByIdTournamentSponsorUseCase = new LoadByIdTournamentSponsorUseCase(tournamentSponsorRepo)
    await loadByIdTournamentSponsorUseCase.loadById('id')
    expect(loadByIdSpy).toHaveBeenCalledWith('id')
  })

  test('Should throw if tournamentSponsorRepository.loadById throws', async () => {
    const loadByIdTournamentSponsorUseCase = new LoadByIdTournamentSponsorUseCase(tournamentSponsorRepo)
    jest.spyOn(tournamentSponsorRepo, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = loadByIdTournamentSponsorUseCase.loadById('id')
    await expect(promise).rejects.toThrow()
  })

  test('Should returns a tournamentSponsor model if success', async () => {
    const loadByIdSpy = jest.spyOn(tournamentSponsorRepo, 'loadById').mockResolvedValueOnce(addResultTournamentSponsorModelMock)

    const loadByIdTournamentSponsorUseCase = new LoadByIdTournamentSponsorUseCase(tournamentSponsorRepo)
    await loadByIdTournamentSponsorUseCase.loadById('id')
    expect(loadByIdSpy).toHaveBeenCalledWith('id')
  })
})
