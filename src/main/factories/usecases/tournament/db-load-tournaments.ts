import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'
import { DbLoadTournaments } from '@/data/usescases/tournament/load-tournaments'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'

export const makeDbLoadTournaments = (): LoadTournaments => {
  const tournamentPostgresRepository = new TournamentPostgresRepository()
  const cityPostgresRepository = new CityPostgresRepository()
  return new DbLoadTournaments(tournamentPostgresRepository, cityPostgresRepository, new SportPostgresRepository())
}
