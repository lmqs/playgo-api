import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { DbAddAccount } from '../../../../../data/usescases/account/add-account/db-add-account'
import { AccountPostgresRepository } from '../../../../../infra/database/postgres/account/account-repository'
import { AddAccount } from '../../../../../domain/usecases/account/add-account'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()

  return new DbAddAccount(bcryptAdapter, accountPostgresRepository, accountPostgresRepository)
}
