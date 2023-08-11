import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { DbRemoveTournamentPayments } from '@/data/usescases/tournament-payments/remove'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'

describe('RemoveTournamentPayments UseCase', () => {
  let tournamentPaymentsRepo: ITournamentPaymentsRepository

  beforeEach(async () => {
    tournamentPaymentsRepo = new TournamentPaymentsPostgresRepository()
  })

  test('Should remove a tournamentPayments with success', async () => {
    jest.spyOn(tournamentPaymentsRepo, 'remove').mockResolvedValueOnce(true)

    const removeTournamentSponsorUseCase = new DbRemoveTournamentPayments(tournamentPaymentsRepo)
    await removeTournamentSponsorUseCase.remove('id')
    expect(tournamentPaymentsRepo.remove).toHaveBeenCalledWith('id')
  })

  test('Should throw if tournamentPayments.remove throws', async () => {
    const removeTournamentSponsorUseCase = new DbRemoveTournamentPayments(tournamentPaymentsRepo)
    jest.spyOn(tournamentPaymentsRepo, 'remove').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = removeTournamentSponsorUseCase.remove('id')
    await expect(promise).rejects.toThrow()
  })
})
