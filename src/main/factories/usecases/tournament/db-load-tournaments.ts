import { TournamentPostgresRepository } from '@/infra/database/postgres/tournament/tournament-repository'
import { LoadTournaments } from '@/domain/usecases/tournament/load-tournaments'
import { DbLoadTournaments } from '@/data/usescases/tournament/load-tournaments'
import { CityPostgresRepository } from '@/infra/database/postgres/city/city-repository'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { DateHandler } from '@/infra/gateways/date/date-handler'

export const makeDbLoadTournaments = (): LoadTournaments => {
  const tournamentRepository = new TournamentPostgresRepository()
  const cityRepository = new CityPostgresRepository()
  const sportRepository = new SportPostgresRepository()
  const dateHelper = new DateHandler()
  return new DbLoadTournaments(tournamentRepository, cityRepository, sportRepository, dateHelper)
}
