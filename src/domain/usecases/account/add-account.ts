import { AccountModel } from '../../models/account'

export type AddAccountParams = {
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
  add: (account: AddAccountParams) => Promise<AccountModel | undefined>
}
