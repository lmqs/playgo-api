import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '../../../presentation/protocols'
import { LogPostgresRepository } from '../../../infra/database/postgres/log/log-repository'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { DbAuthentication } from '../../../data/usescases/authentication/db-authentication'
import { makeLoginValidation } from './login-validation-factory'
import { AccountPostgresRepository } from '../../../infra/database/postgres/account/account-repository'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { ENVIRONMENT } from '../../config/env'

export const makeLoginController = (): Controller => {
  const accountRepository = new AccountPostgresRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(ENVIRONMENT.server.secret)
  const dbAuthentication = new AccountPostgresRepository()
  const authentication = new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, dbAuthentication)
  const loginController = new LoginController(authentication, makeLoginValidation())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(loginController, logPostgresRepository)
}
