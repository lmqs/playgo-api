import { Decrypter } from '@/data/protocols/criptography/decrypter'
import { DbLoadAccountByTokenUseCase } from '@/data/usescases/account/db-load-account-by-token'
import { IAccountRepository } from '@/data/protocols/db'
import { JwtAdapter } from '@/infra/criptography'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { dbAccountModelMock } from './account-mock'

describe('DbLoadAccountByToken', () => {
  let accountRepoStub: IAccountRepository
  let decrypterStub: Decrypter

  beforeEach(async () => {
    decrypterStub = new JwtAdapter('secret')
    accountRepoStub = new AccountPostgresRepository()
  })

  test('Should call Decrypter with correct values', async () => {
    const loadAccountUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await loadAccountUseCase.load('any_token', 'any_role')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return undefined if Decrypter returns undefined', async () => {
    const loadAccountUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(undefined))
    const account = await loadAccountUseCase.load('any_token', 'any_role')
    expect(account).toBeUndefined()
  })

  test('Should throw if Decrypter throws', async () => {
    const loadAccountUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.reject(new Error()))

    const account = await loadAccountUseCase.load('any_token', 'any_role')
    expect(account).toBeUndefined()
  })

  test('Should call Decrypter with correct values', async () => {
    const loadAccountUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await loadAccountUseCase.load('any_token', 'any_role')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should call accountRepository.loadByToken with correct values', async () => {
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve('any_token'))
    jest.spyOn(accountRepoStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const loadAccountUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)
    const loadAccountByTokenRepositorySpy = jest.spyOn(accountRepoStub, 'loadByToken')
    await loadAccountUseCase.load('any_token', 'any_role')
    expect(loadAccountByTokenRepositorySpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return undefined if accountRepository.loadByToken returns undefined', async () => {
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve('any_token'))
    jest.spyOn(accountRepoStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(undefined))

    const loadAccountUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)
    const account = await loadAccountUseCase.load('any_token', 'any_role')
    expect(account).toBeUndefined()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve('any_token'))
    jest.spyOn(accountRepoStub, 'loadByToken').mockReturnValueOnce(Promise.reject(new Error()))

    const loadAccountUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)

    const promise = loadAccountUseCase.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve('any_token'))
    jest.spyOn(accountRepoStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const loadAccountUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)
    const account = await loadAccountUseCase.load('any_token', 'any_role')
    expect(account).toEqual(dbAccountModelMock)
  })
})
