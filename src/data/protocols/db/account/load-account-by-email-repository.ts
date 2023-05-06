import { AccountModel } from '@/domain/models/account'

export interface LoadAccountByEmailRepository {
  loadByEmail: (user: string) => Promise<AccountModel | undefined>
}
