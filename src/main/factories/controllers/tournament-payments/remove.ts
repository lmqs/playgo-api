import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { RemoveTournamentPaymentsController } from '@/presentation/controllers/tournament-payments/remove'
import { makeRemoveTournamentPaymentsUseCase } from '@/main/factories/usecases/tournament-payments/remove'
import { makeRemoveTournamentPaymentsValidation } from './remove-validation'

export const makeRemoveTournamentPaymentsController = (): Controller => {
  const controller = new RemoveTournamentPaymentsController(
    makeRemoveTournamentPaymentsValidation(), makeRemoveTournamentPaymentsUseCase()
  )
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}
