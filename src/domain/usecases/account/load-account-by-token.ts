import { AccountModel } from '@/domain/models/account'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<ILoadAccountByToken.Result | undefined>
}

export namespace ILoadAccountByToken {
  export type Result = AccountModel
}
