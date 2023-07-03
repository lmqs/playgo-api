import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeAddRegistrationsValidation } from './add-registrations-validation-factory'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeAddRegistrationsUseCase } from '@/main/factories/usecases/registrations/add-registrations-factory'
import { AddRegistrationsController } from '@/presentation/controllers/registration/add-registrations-controller'

export const makeAddRegistrationsController = (): Controller => {
  const addRegistrationsController = new AddRegistrationsController(
    makeAddRegistrationsValidation(), makeAddRegistrationsUseCase()
  )
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(addRegistrationsController, logPostgresRepository)
}
