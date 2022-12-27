import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string
  user: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}
