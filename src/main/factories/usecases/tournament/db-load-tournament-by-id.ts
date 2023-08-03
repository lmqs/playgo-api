import { DbLoadTournamentById } from '@/data/usescases/tournament'
import { LoadTournamentById } from '@/domain/usecases/tournament/load-tournament-by-id'
import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { DateHandler } from '@/helpers/date-handler'

export const makeDbLoadTournamentById = (): LoadTournamentById => {
  const tournamentRepository = new TournamentPostgresRepository()
  const dateHelper = new DateHandler()
  return new DbLoadTournamentById(tournamentRepository, dateHelper)
}
