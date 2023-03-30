import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'
import { DbLoadTournaments } from '@/data/usescases/tournament/load-tournaments'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'

export const makeDbLoadTournaments = (): LoadTournaments => {
  const tournamentPostgresRepository = new TournamentPostgresRepository(new CityPostgresRepository())
  return new DbLoadTournaments(tournamentPostgresRepository)
}
