import { LoadByTournamentIdTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor/db-load-by-tournament-id-tournament-sponsor'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { ILoadByTournamentIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export const makeLoadTournamentByTournamentId = (): ILoadByTournamentIdTournamentSponsor => {
  const tournamentSponsorPostgresRepository = new TournamentSponsorPostgresRepository()
  return new LoadByTournamentIdTournamentSponsorUseCase(tournamentSponsorPostgresRepository)
}
