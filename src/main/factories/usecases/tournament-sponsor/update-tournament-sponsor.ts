import { UpdateTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { IUpdateTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export const makeUpdateTournamentSponsor = (): IUpdateTournamentSponsor => {
  const tournamentSponsorPostgresRepository = new TournamentSponsorPostgresRepository()
  return new UpdateTournamentSponsorUseCase(tournamentSponsorPostgresRepository)
}
