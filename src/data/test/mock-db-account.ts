import { AccountModel } from '../../domain/models/account'
import { mockAccountModel } from '../../domain/test'
import { AddAccountRepository, LoadAccountByUserRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '../protocols/db/account'
import { AddAccountParams } from '../usescases/account/add-account/db-add-account-protocols'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccountParams: AddAccountParams): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByUserRepository = (): LoadAccountByUserRepository => {
  class LoadAccountByUserRepository implements LoadAccountByUserRepository {
    async loadByUser (user: string): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByUserRepository()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel | undefined> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}
export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      await new Promise<void>(resolve => { resolve() })
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
