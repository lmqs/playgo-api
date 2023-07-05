import { IAccountRepository } from '@/data/protocols/db'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { accountFromLoadByIdModelMock, dbAccountModelMock } from './account-mock'
import { DbLoadAccountByIdUseCase } from '@/data/usescases/account/db-load-account-by-id'

describe('DbLoadAccountByToken', () => {
  let accountRepoStub: IAccountRepository

  beforeEach(async () => {
    accountRepoStub = new AccountPostgresRepository()
  })

  test('Should call accountRepository.loadById with correct values', async () => {
    jest.spyOn(accountRepoStub, 'loadById').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const loadAccountUseCase = new DbLoadAccountByIdUseCase(accountRepoStub)
    const loadAccountByTokenRepositorySpy = jest.spyOn(accountRepoStub, 'loadById')
    await loadAccountUseCase.loadById('any_id')
    expect(loadAccountByTokenRepositorySpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return undefined if accountRepository.loadById returns undefined', async () => {
    jest.spyOn(accountRepoStub, 'loadById').mockReturnValueOnce(Promise.resolve(undefined))

    const loadAccountUseCase = new DbLoadAccountByIdUseCase(accountRepoStub)
    const account = await loadAccountUseCase.loadById('any_id')
    expect(account).toBeUndefined()
  })

  test('Should throw if accountRepository.loadById throws', async () => {
    jest.spyOn(accountRepoStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const loadAccountUseCase = new DbLoadAccountByIdUseCase(accountRepoStub)

    const promise = loadAccountUseCase.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    jest.spyOn(accountRepoStub, 'loadById').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const loadAccountUseCase = new DbLoadAccountByIdUseCase(accountRepoStub)
    const account = await loadAccountUseCase.loadById('any_id')
    expect(account).toEqual(accountFromLoadByIdModelMock)
  })
})
