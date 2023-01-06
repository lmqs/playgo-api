import { AccountModel } from './../../../../domain/models/account'

export interface LoadAccountByUserRepository {
  load: (user: string) => Promise<AccountModel | undefined>
}
