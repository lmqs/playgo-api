import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/account/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/account/db-add-account'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

export const makeSignUpController = (): Controller => {
  const addAccount = makeDbAddAccount()
  const authentication = makeDbAuthentication()
  const signUpController = new SignUpController(addAccount, makeSignUpValidation(), authentication)
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(signUpController, logPostgresRepository)
}
