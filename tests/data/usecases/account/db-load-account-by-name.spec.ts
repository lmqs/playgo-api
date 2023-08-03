import { IAccountRepository } from '@/data/protocols/db'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { loadByNameArrayMock, loadByNameResultMock } from './account-mock'
import { DbLoadAccountByNameUseCase } from '@/data/usescases/account/db-load-account-by-name'

describe('DbLoadAccountByToken', () => {
  let accountRepoStub: IAccountRepository

  beforeEach(async () => {
    accountRepoStub = new AccountPostgresRepository()
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })
  test('Should return empty array if accountRepository.loadByName returns empty', async () => {
    jest.spyOn(accountRepoStub, 'loadByName').mockResolvedValueOnce([])

    const useCase = new DbLoadAccountByNameUseCase(accountRepoStub)
    const account = await useCase.loadByName('Lu')
    expect(account.length).toBe(0)
    expect(accountRepoStub.loadByName).toHaveBeenCalledWith('Lu')
  })

  test('Should throw if accountRepository.loadByName throws', async () => {
    jest.spyOn(accountRepoStub, 'loadByName').mockImplementation(() => {
      throw new Error()
    })

    const useCase = new DbLoadAccountByNameUseCase(accountRepoStub)

    const promise = useCase.loadByName('Lu')
    await expect(promise).rejects.toThrow()
  })

  test('Should return some accounts on success', async () => {
    jest.spyOn(accountRepoStub, 'loadByName').mockResolvedValueOnce(loadByNameArrayMock)

    const useCase = new DbLoadAccountByNameUseCase(accountRepoStub)
    const account = await useCase.loadByName('Lu')
    expect(account).toEqual(loadByNameResultMock)
    expect(accountRepoStub.loadByName).toHaveBeenCalledWith('Lu')
  })
})
