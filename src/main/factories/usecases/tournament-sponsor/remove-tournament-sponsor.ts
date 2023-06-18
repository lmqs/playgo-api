
import { IRemoveTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
import { RemoveTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor/db-remove-tournament-sponsor'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'

export const makeRemoveTournamentSponsor = (): IRemoveTournamentSponsor => {
  const tournamentSponsorPostgresRepository = new TournamentSponsorPostgresRepository()
  return new RemoveTournamentSponsorUseCase(tournamentSponsorPostgresRepository)
}
