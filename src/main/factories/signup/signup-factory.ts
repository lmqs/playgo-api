import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { DbAddAccount } from '../../../data/usescases/add-account/db-add-account'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { AccountPostgresRepository } from '../../../infra/database/postgres/account/account-repository'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '../../../presentation/protocols'
import { LogPostgresRepository } from '../../../infra/database/postgres/log/log-repository'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()

  const addAccount = new DbAddAccount(bcryptAdapter, accountPostgresRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(signUpController, logPostgresRepository)
}
