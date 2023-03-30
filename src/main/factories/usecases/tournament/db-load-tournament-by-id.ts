import { DbLoadTournamentById } from '@/data/usescases/tournament'
import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournament-by-id'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'

export const makeDbLoadTournamentById = (): LoadTournamentById => {
  const cityPostgresRepository = new TournamentPostgresRepository(new CityPostgresRepository())
  return new DbLoadTournamentById(cityPostgresRepository)
}
