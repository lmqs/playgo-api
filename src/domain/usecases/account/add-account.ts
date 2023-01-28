import { AccountModel } from '../../models/account'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result | undefined>
}

export namespace AddAccount {
  export type Params = {
    name: string
    user: string
    password: string
    email: string
    cityId: number
    phoneNumber: string
    photo?: string
    deleted?: boolean
    role?: string
  }
  export type Result = AccountModel
}
