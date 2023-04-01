import { DbLoadTournamentById } from '@/data/usescases/tournament'
import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournament-by-id'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'

export const makeDbLoadTournamentById = (): LoadTournamentById => {
  const cityPostgresRepository = new TournamentPostgresRepository(new CityPostgresRepository(), new SportPostgresRepository())
  return new DbLoadTournamentById(cityPostgresRepository)
}
