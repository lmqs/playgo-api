import { ILoadByIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
import { LoadByIdTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor/db-load-by-id-tournament-sponsor'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'

export const makeLoadTournamentSponsorById = (): ILoadByIdTournamentSponsor => {
  const tournamentSponsorPostgresRepository = new TournamentSponsorPostgresRepository()
  return new LoadByIdTournamentSponsorUseCase(tournamentSponsorPostgresRepository)
}
