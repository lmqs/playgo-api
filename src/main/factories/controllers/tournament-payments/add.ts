import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { AddTournamentPaymentsController } from '@/presentation/controllers/tournament-payments/add'
import { makeAddTournamentPaymentsValidation } from './add-validation'
import { makeAddTournamentPaymentsUseCase } from '@/main/factories/usecases/tournament-payments/add'

export const makeAddTournamentPaymentsController = (): Controller => {
  const addTournamentController = new AddTournamentPaymentsController(
    makeAddTournamentPaymentsValidation(), makeAddTournamentPaymentsUseCase()
  )
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addTournamentController, logPostgresRepository)
}
