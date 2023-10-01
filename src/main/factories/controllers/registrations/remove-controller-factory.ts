import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { RemoveRegistrationsController } from '@/presentation/controllers/registration/remove-controller'
import { makeRemoveRegistrationsUseCase } from '../../usecases/registrations/remove-factory'
import { makeRemoveRegistrationsValidation } from './remove-validation-factory'

export const makeRemoveRegistrationsController = (): Controller => {
  const controller = new RemoveRegistrationsController(makeRemoveRegistrationsValidation(), makeRemoveRegistrationsUseCase())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}
