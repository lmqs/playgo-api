import { AddAccountParams } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account'

export interface AddAccountRepository {
  add: (addAccountParams: AddAccountParams) => Promise<AccountModel | undefined >
}
