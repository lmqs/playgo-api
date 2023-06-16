import { AccountModel } from '@/domain/models/account'

export interface IAddAccount {
  add: (account: IAddAccount.Params) => Promise<IAddAccount.Result | Error>
}

export namespace IAddAccount {
  export type Params = {
    name: string
    gender: string
    password: string
    email: string
    cityId: number
    phoneNumber: string
    dateBirthday: string
    photo?: string
    deleted?: boolean
    role?: string
  }
  export type Result = AccountModel
}
