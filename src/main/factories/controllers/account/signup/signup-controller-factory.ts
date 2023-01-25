import { SignUpController } from '../../../../../presentation/controllers/signup/signup-controller'
import { LogControllerDecorator } from '../../../../decorators/log-controller-decorator'
import { Controller } from '../../../../../presentation/protocols'
import { LogPostgresRepository } from '../../../../../infra/database/postgres/log/log-repository'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '../../../../../main/factories/usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account'

export const makeSignUpController = (): Controller => {
  const addAccount = makeDbAddAccount()
  const authentication = makeDbAuthentication()
  const signUpController = new SignUpController(addAccount, makeSignUpValidation(), authentication)
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(signUpController, logPostgresRepository)
}
