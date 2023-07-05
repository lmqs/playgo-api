import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeLoadAccountByNameValidation } from './load-by-name-validation-factory'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { LoadAccountByNameController } from '@/presentation/controllers/account/load-by-name-controller'
import { makeDbLoadAccountByName } from '@/main/factories/usecases/account/db-load-account-by-name-factory'

export const makeLoadAccountByNameController = (): Controller => {
  const signUpController = new LoadAccountByNameController(makeDbLoadAccountByName(), makeLoadAccountByNameValidation())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(signUpController, logPostgresRepository)
}
