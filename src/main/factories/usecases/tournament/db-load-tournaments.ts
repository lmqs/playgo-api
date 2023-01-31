import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'
import { DbLoadTournaments } from '@/data/usescases/tournament/load-tournaments'

export const makeDbLoadTournaments = (): LoadTournaments => {
  const tournamentPostgresRepository = new TournamentPostgresRepository()
  return new DbLoadTournaments(tournamentPostgresRepository)
}
