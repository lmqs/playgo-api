import { AccountModel } from '../../models/account'

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<LoadAccountByToken.Result | undefined>
}

export namespace LoadAccountByToken {
  export type Result = AccountModel
}
