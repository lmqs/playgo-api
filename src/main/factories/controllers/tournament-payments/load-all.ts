import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoadAllTournamentPaymentsController } from '@/presentation/controllers/tournament-payments/load-all'
import { makeLoadAllTournamentPaymentsUseCase } from '../../usecases/tournament-payments/load-all'

export const makeLoadAllTournamentPaymentsController = (): Controller => {
  const controller = new LoadAllTournamentPaymentsController(makeLoadAllTournamentPaymentsUseCase())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}
