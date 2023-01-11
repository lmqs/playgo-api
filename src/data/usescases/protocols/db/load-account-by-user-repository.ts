import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByUserRepository {
  loadByUser: (user: string) => Promise<AccountModel | undefined>
}
