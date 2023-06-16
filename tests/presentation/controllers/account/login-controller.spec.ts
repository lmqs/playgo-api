import { IAuthentication } from '@/domain/usecases/authentication/authentication'
import { DbAuthenticationUseCase } from '@/data/usescases/account'
import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, unauthorized } from '@/presentation/helpers/http/http-helper'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { ValidationComposite } from '@/presentation/validation/validators'
import { Validation } from '@/presentation/protocols'
import { BcryptAdapter, JwtAdapter } from '@/infra/criptography'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { authModelMock, requestLoginMock } from './account-mock'

describe('SignUP Controller', () => {
  let validationStub: Validation
  let authenticationUseCaseStub: IAuthentication

  beforeEach(() => {
    const bcryptAdapter = new BcryptAdapter(12)
    const accountRepository = new AccountPostgresRepository()
    const jwtAdapter = new JwtAdapter('secret')
    authenticationUseCaseStub = new DbAuthenticationUseCase(accountRepository, bcryptAdapter, jwtAdapter)

    const validations: Validation[] = []
    validationStub = new ValidationComposite(validations)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(authenticationUseCaseStub, 'auth').mockResolvedValueOnce(authModelMock)

    const controller = new LoginController(authenticationUseCaseStub, validationStub)
    const addSpy = jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    await controller.handle(requestLoginMock)
    expect(addSpy).toHaveBeenCalledWith(requestLoginMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const controller = new LoginController(authenticationUseCaseStub, validationStub)
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await controller.handle(requestLoginMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call authentication.auth with correct params', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    const controller = new LoginController(authenticationUseCaseStub, validationStub)
    const authSpy = jest.spyOn(authenticationUseCaseStub, 'auth').mockResolvedValueOnce(authModelMock)

    await controller.handle(requestLoginMock)
    expect(authSpy).toHaveBeenCalledWith({ email: 'valid_email', password: 'valid_password' })
  })

  test('Should return 401 if invalid credentials are provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    const controller = new LoginController(authenticationUseCaseStub, validationStub)

    jest.spyOn(authenticationUseCaseStub, 'auth').mockReturnValueOnce(Promise.resolve(undefined))

    const httpResponse = await controller.handle(requestLoginMock)
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if authentication.auth throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    const controller = new LoginController(authenticationUseCaseStub, validationStub)
    const fakeError = new Error('fake error')
    jest.spyOn(authenticationUseCaseStub, 'auth').mockImplementationOnce(() => {
      throw fakeError
    })

    const httpResponse = await controller.handle(requestLoginMock)
    expect(httpResponse).toEqual(serverError(fakeError))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(authenticationUseCaseStub, 'auth').mockResolvedValueOnce(authModelMock)
    const controller = new LoginController(authenticationUseCaseStub, validationStub)

    const httpResponse = await controller.handle(requestLoginMock)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name', isAdmin: true }))
  })
})
