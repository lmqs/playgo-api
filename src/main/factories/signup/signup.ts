import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { DbAddAccount } from '../../../data/usescases/add-account/db-add-account'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { AccountPostgresRepository } from '../../../infra/database/postgres/account-repository/account-repository'
import { LogControllerDecorator } from '../../decorators/log'
import { Controller } from '../../../presentation/protocols'
import { LogPostgresRepository } from '../../../infra/database/postgres/log-repository/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()

  const addAccount = new DbAddAccount(bcryptAdapter, accountPostgresRepository)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  const logPostgresRepository = new LogPostgresRepository()
  return new LogControllerDecorator(signUpController, logPostgresRepository)
}
