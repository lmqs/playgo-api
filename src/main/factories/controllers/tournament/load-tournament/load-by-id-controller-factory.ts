import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoadTournamentByIdController } from '@/presentation/controllers/tournament/load-by-id-controller'
import { makeDbLoadTournamentById } from '@/main/factories/usecases/tournament'
import { makeLoadTournamentByIdValidation } from './load-by-id-tournament-validation-factory'

export const makeLoadTournamentByIdController = (): Controller => {
  const controller = new LoadTournamentByIdController(makeLoadTournamentByIdValidation(), makeDbLoadTournamentById())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}
