import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByUserRepository {
  loadByEmail: (user: string) => Promise<AccountModel | undefined>
}
