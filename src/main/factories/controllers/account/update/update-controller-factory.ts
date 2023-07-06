import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeUpdateAccountValidation } from './update-validation-factory'
import { UpdateAccountController } from '@/presentation/controllers/account/update-account-controller'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeDbUpdateAccount } from '@/main/factories/usecases/account/db-update-account'

export const makeUpdateAccountController = (): Controller => {
  const updateController = new UpdateAccountController(makeDbUpdateAccount(), makeUpdateAccountValidation())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(updateController, logPostgresRepository)
}
