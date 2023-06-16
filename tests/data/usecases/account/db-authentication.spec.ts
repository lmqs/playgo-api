import { HashComparer, Encrypter } from '@/data/protocols/criptography'
import { DbAuthenticationUseCase } from '@/data/usescases/account/db-authentication'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { IAccountRepository } from '@/data/protocols/db'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { addAuthenticationMock, dbAccountModelMock } from './account-mock'

describe('DbAddAccount UseCase', () => {
  let accountRepoStub: IAccountRepository
  let hashCompareStub: HashComparer
  let tokenGeneratorStub: Encrypter

  beforeEach(async () => {
    hashCompareStub = new BcryptAdapter(12)
    tokenGeneratorStub = new JwtAdapter('secret')
    accountRepoStub = new AccountPostgresRepository()
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('Should call accountRepository.loadByEmail with correct email', async () => {
    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const accountRepoSpy = jest.spyOn(accountRepoStub, 'loadByEmail')

    await authenticationUseCase.auth(addAuthenticationMock)
    expect(accountRepoSpy).toHaveBeenCalledTimes(1)
    expect(accountRepoSpy).toHaveBeenCalledWith('valid_email')
  })

  test('Should return undefined if accountRepository.loadByEmail returns undefined', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    const model = await authenticationUseCase.auth(addAuthenticationMock)
    expect(model).toBeUndefined()
  })

  test('Should throw if accountRepository.loadByEmail throws', async () => {
    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = authenticationUseCase.auth(addAuthenticationMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should call hashComparer with correct password', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    const hashComparerSpy = jest.spyOn(hashCompareStub, 'compare')
    await authenticationUseCase.auth(addAuthenticationMock)

    expect(hashComparerSpy).toHaveBeenCalledTimes(1)
    expect(hashComparerSpy).toHaveBeenCalledWith(addAuthenticationMock.password, dbAccountModelMock.password)
  })

  test('Should throw if hashComparer throws', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = authenticationUseCase.auth(addAuthenticationMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return undefined if hashComparer returns undefined', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(false))

    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    const model = await authenticationUseCase.auth(addAuthenticationMock)
    expect(model).toBeUndefined()
  })

  test('Should call Encrypter with correct id', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(tokenGeneratorStub, 'encrypt').mockReturnValueOnce(Promise.resolve('any_token'))
    jest.spyOn(accountRepoStub, 'updateAccessToken').mockReturnValueOnce(Promise.resolve())

    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    const tokenGeneratorSpy = jest.spyOn(tokenGeneratorStub, 'encrypt')
    await authenticationUseCase.auth(addAuthenticationMock)
    expect(tokenGeneratorSpy).toHaveBeenCalledWith(dbAccountModelMock.id)
  })

  test('Should throw if Encrypter throws', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(tokenGeneratorStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))

    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    const promise = authenticationUseCase.auth(addAuthenticationMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should call accountRepository.updateAccessToken with correct values', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(tokenGeneratorStub, 'encrypt').mockReturnValueOnce(Promise.resolve('any_token'))
    jest.spyOn(accountRepoStub, 'updateAccessToken').mockReturnValueOnce(Promise.resolve())

    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    const updateAccessTokenSpy = jest.spyOn(accountRepoStub, 'updateAccessToken')
    await authenticationUseCase.auth(addAuthenticationMock)
    expect(updateAccessTokenSpy).toHaveBeenCalledWith(dbAccountModelMock.id, 'any_token')
  })

  test('Should throw if accountRepository.updateAccessToken throws', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(tokenGeneratorStub, 'encrypt').mockReturnValueOnce(Promise.resolve('any_token'))
    jest.spyOn(accountRepoStub, 'updateAccessToken').mockReturnValueOnce(Promise.reject(new Error()))
    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    const promise = authenticationUseCase.auth(addAuthenticationMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    jest.spyOn(accountRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(Promise.resolve(true))
    jest.spyOn(tokenGeneratorStub, 'encrypt').mockReturnValueOnce(Promise.resolve('any_token'))
    jest.spyOn(accountRepoStub, 'updateAccessToken').mockReturnValueOnce(Promise.resolve())

    const authenticationUseCase = new DbAuthenticationUseCase(accountRepoStub, hashCompareStub, tokenGeneratorStub)
    const result = await authenticationUseCase.auth(addAuthenticationMock)
    expect(result).toStrictEqual({ accessToken: 'any_token', name: 'valid_name', isAdmin: false })
  })
})
