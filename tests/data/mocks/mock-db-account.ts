import { AccountModel } from '@/domain/models/account'
import { mockAccountModel } from '@/tests/domain/mocks'
import { AddAccountRepository, LoadAccountByUserRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '../protocols/db/account'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (data: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
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
