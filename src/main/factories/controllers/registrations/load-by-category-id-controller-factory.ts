import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeLoadRegistrationByCategoryIdValidation } from './load-by-category-id-validation-factory'
import { makeLoadRegistrationByCategoryIdUseCase } from '../../usecases/registrations/load-by-category-id-factory'
import { LoadRegistrationsByCategoryController } from '@/presentation/controllers/registration/load-by-category-controller'

export const makeLoadRegistrationByCategoryIdController = (): Controller => {
  const controller = new LoadRegistrationsByCategoryController(
    makeLoadRegistrationByCategoryIdValidation(), makeLoadRegistrationByCategoryIdUseCase()
  )
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(controller, logPostgresRepository)
}
