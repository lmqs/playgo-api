import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { DateHandler } from '@/helpers/date-handler'
import { ILoadTournamentByFilter } from '@/domain/usecases/tournament/load-tournament-by-filter'
import { DbLoadFilterTournaments } from '@/data/usescases/tournament/load-filter-tournament'

export const makeDbLoadTournamentByFilter = (): ILoadTournamentByFilter => {
  const tournamentRepository = new TournamentPostgresRepository()
  const dateHelper = new DateHandler()
  return new DbLoadFilterTournaments(tournamentRepository, dateHelper)
}
