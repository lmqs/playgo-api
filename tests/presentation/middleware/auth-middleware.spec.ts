import { Decrypter } from '@/data/protocols/criptography'
import { IAccountRepository } from '@/data/protocols/db'
import { DbLoadAccountByTokenUseCase } from '@/data/usescases/account'
import { JwtAdapter } from '@/infra/criptography'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { ILoadAccountByToken } from '@/presentation/middlewares/auth-middleware-protocols'
import { accountModelMock } from './middleware-mock'

describe('Auth Middleware', () => {
  let accountRepoStub: IAccountRepository
  let decrypterStub: Decrypter
  let loadByTokenUseCase: ILoadAccountByToken

  beforeEach(() => {
    decrypterStub = new JwtAdapter('secret')
    accountRepoStub = new AccountPostgresRepository()
    loadByTokenUseCase = new DbLoadAccountByTokenUseCase(decrypterStub, accountRepoStub)
  })

  test('Should return 403 if no x-access-token not exists in headers', async () => {
    const authMiddleware = new AuthMiddleware(loadByTokenUseCase, 'any_role')
    const httpResponse = await authMiddleware.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call ILoadAccountByToken with correct accessToken', async () => {
    const authMiddleware = new AuthMiddleware(loadByTokenUseCase, 'any_role')
    const loadByTokenUseCaseSpy = jest.spyOn(loadByTokenUseCase, 'load')
    await authMiddleware.handle({ accessToken: 'any_token' })
    expect(loadByTokenUseCaseSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return 403 if ILoadAccountByToken returns null', async () => {
    const authMiddleware = new AuthMiddleware(loadByTokenUseCase)
    jest.spyOn(loadByTokenUseCase, 'load').mockReturnValueOnce(new Promise(resolve => { resolve(undefined) }))
    const httpResponse = await authMiddleware.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if ILoadAccountByToken returns an account', async () => {
    jest.spyOn(loadByTokenUseCase, 'load').mockReturnValueOnce(Promise.resolve(accountModelMock))

    const authMiddleware = new AuthMiddleware(loadByTokenUseCase)
    const httpResponse = await authMiddleware.handle({ accessToken: 'any_token' })
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if ILoadAccountByToken throws', async () => {
    const authMiddleware = new AuthMiddleware(loadByTokenUseCase)
    jest.spyOn(loadByTokenUseCase, 'load').mockReturnValueOnce(Promise.reject(new Error()))

    const httpResponse = await authMiddleware.handle({ accessToken: 'any_token' })
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
