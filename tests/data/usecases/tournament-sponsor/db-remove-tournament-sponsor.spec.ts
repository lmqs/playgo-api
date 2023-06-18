import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { RemoveTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor/db-remove-tournament-sponsor'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'

describe('RemoveTournamentSponsor UseCase', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
  })

  test('Should remove a tournamentSponsor with success', async () => {
    const removeSpy = jest.spyOn(tournamentSponsorRepo, 'remove').mockResolvedValueOnce()

    const removeTournamentSponsorUseCase = new RemoveTournamentSponsorUseCase(tournamentSponsorRepo)
    await removeTournamentSponsorUseCase.remove('id')
    expect(removeSpy).toHaveBeenCalledWith('id')
  })

  test('Should throw if tournamentSponsorRepository.remove throws', async () => {
    const removeTournamentSponsorUseCase = new RemoveTournamentSponsorUseCase(tournamentSponsorRepo)
    jest.spyOn(tournamentSponsorRepo, 'remove').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = removeTournamentSponsorUseCase.remove('id')
    await expect(promise).rejects.toThrow()
  })
})
