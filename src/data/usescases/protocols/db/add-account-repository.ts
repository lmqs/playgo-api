import { AccountModel, AddAccountModel } from '../db-add-account-protocols'

export interface AddAccountRepository {
  add: (addAccountModel: AddAccountModel) => Promise<AccountModel>
}
