import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { addTournamentSponsorModelMock, dbAddTournamentSponsorModelMock } from './tournament-sponsor-repository-mock'

describe('Tournament-Sponsor Postgres Repository', () => {
  describe('add()', () => {
    test('Should return a tournament-sponsor model on add success', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.create = jest.fn().mockReturnValue(dbAddTournamentSponsorModelMock)

      await tournamentSponsorRepository.add(addTournamentSponsorModelMock)
    })

    test('Should rethrow if create fails', async () => {
      const tournamentSponsorRepository = new TournamentSponsorPostgresRepository()
      tournamentSponsorRepository.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = tournamentSponsorRepository.add(addTournamentSponsorModelMock)
      await expect(promise).rejects.toThrow()
    })
  })
})
