import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoadTournamentsController } from '@/presentation/controllers/tournament/load-tournaments-controller'
import { makeDbLoadTournaments } from '../../../usecases/tournament/db-load-tournaments'

export const makeLoadTournamentsController = (): Controller => {
  const loadTournamentsController = new LoadTournamentsController(makeDbLoadTournaments())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(loadTournamentsController, logPostgresRepository)
}
