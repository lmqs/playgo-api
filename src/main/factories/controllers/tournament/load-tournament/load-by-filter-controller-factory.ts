import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoadTournamentByFilterController } from '@/presentation/controllers/tournament/load-by-filter-controller'
import { makeDbLoadTournamentByFilter } from '@/main/factories/usecases/tournament/db-load-tournament-by-filter'

export const makeLoadTournamentByFilterController = (): Controller => {
  const controller = new LoadTournamentByFilterController(makeDbLoadTournamentByFilter())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}
