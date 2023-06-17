import { AccountModel } from '@/domain/models/account'

export interface ILoadAccountById {
  loadById: (id: string) => Promise<ILoadAccountById.Result | undefined>
}

export namespace ILoadAccountById {
  export type Result = AccountModel
}
