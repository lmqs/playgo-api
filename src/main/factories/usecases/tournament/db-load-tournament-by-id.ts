import { DbLoadTournamentById } from '@/data/usescases/tournament'
import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournament-by-id'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'

export const makeDbLoadTournamentById = (): LoadTournamentById => {
  const cityPostgresRepository = new TournamentPostgresRepository()
  return new DbLoadTournamentById(cityPostgresRepository)
}
