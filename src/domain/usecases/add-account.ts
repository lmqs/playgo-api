import { AccountModel } from '../models/account'

export interface AddAccountModel {
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

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | undefined>
}
