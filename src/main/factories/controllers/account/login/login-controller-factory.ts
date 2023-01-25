import { LogControllerDecorator } from '../../../../decorators/log-controller-decorator'
import { Controller } from '../../../../../presentation/protocols'
import { LogPostgresRepository } from '../../../../../infra/database/postgres/log/log-repository'
import { LoginController } from '../../../../../presentation/controllers/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { makeDbAuthentication } from '../../../../../main/factories/usecases/account/authentication/db-authentication-factory'

export const makeLoginController = (): Controller => {
  const authentication = makeDbAuthentication()
  const loginController = new LoginController(authentication, makeLoginValidation())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(loginController, logPostgresRepository)
}
