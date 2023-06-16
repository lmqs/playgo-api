import { DbAddAccountUseCase } from '@/data/usescases/account'
import { IAddAccount } from '@/domain/usecases/account/add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'

export const makeDbAddAccount = (): IAddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPostgresRepository = new AccountPostgresRepository()

  return new DbAddAccountUseCase(bcryptAdapter, accountPostgresRepository)
}
