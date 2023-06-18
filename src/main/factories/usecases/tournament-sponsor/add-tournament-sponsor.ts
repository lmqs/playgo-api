import { AddTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { IAddTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export const makeAddTournamentSponsor = (): IAddTournamentSponsor => {
  const tournamentSponsorPostgresRepository = new TournamentSponsorPostgresRepository()
  return new AddTournamentSponsorUseCase(tournamentSponsorPostgresRepository)
}
