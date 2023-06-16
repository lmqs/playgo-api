import { IAuthentication } from '@/domain/usecases/authentication/authentication'
import { IAddAccount } from '@/domain/usecases/account/add-account'
import { MissingParamError, EmailInUseError } from '@/presentation/errors'
import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { ok, badRequest, serverError, forbidden } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { DbAddAccountUseCase, DbAuthenticationUseCase } from '@/data/usescases/account'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adapter'
import { ValidationComposite } from '@/presentation/validation/validators'
import { addAccountModelUseCaseMock, authModelMock, requestMock } from './account-mock'

describe('SignUP Controller', () => {
  let validationStub: Validation
  let addAccountUseCaseStub: IAddAccount
  let authenticationUseCaseStub: IAuthentication

  beforeEach(() => {
    const bcryptAdapter = new BcryptAdapter(12)
    const accountRepository = new AccountPostgresRepository()
    addAccountUseCaseStub = new DbAddAccountUseCase(bcryptAdapter, accountRepository)

    const jwtAdapter = new JwtAdapter('secret')
    authenticationUseCaseStub = new DbAuthenticationUseCase(accountRepository, bcryptAdapter, jwtAdapter)

    const validations: Validation[] = []
    validationStub = new ValidationComposite(validations)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(addAccountUseCaseStub, 'add').mockResolvedValueOnce(addAccountModelUseCaseMock)
    jest.spyOn(authenticationUseCaseStub, 'auth').mockResolvedValueOnce(authModelMock)

    const signUpController = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)

    const validationSpy = jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    await signUpController.handle(requestMock)
    expect(validationSpy).toHaveBeenCalledTimes(1)
    expect(validationSpy).toHaveBeenCalledWith(requestMock)
  })

  test('Should return 400 if validation returns an error', async () => {
    const signUpController = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await signUpController.handle(requestMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call addAccountUseCase.add with correct values', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(authenticationUseCaseStub, 'auth').mockResolvedValueOnce(authModelMock)

    const signUpController = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)

    const addSpy = jest.spyOn(addAccountUseCaseStub, 'add').mockResolvedValueOnce(addAccountModelUseCaseMock)

    await signUpController.handle(requestMock)
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith(requestMock)
  })

  test('Should return 500 if addAccountUseCase.add throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    const signUpController = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)
    jest.spyOn(addAccountUseCaseStub, 'add').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const httpResponse = await signUpController.handle(requestMock)
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 403 if addAccountUseCase.add throws EmailInUseError', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    const signUpController = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)
    jest.spyOn(addAccountUseCaseStub, 'add').mockImplementationOnce(() => {
      throw new EmailInUseError()
    })

    const httpResponse = await signUpController.handle(requestMock)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should call authentication.auth with correct params', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(addAccountUseCaseStub, 'add').mockResolvedValueOnce(addAccountModelUseCaseMock)

    const signUpController = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)
    const authSpy = jest.spyOn(authenticationUseCaseStub, 'auth').mockResolvedValueOnce(authModelMock)

    await signUpController.handle(requestMock)
    expect(authSpy).toHaveBeenCalledWith({ email: 'valid_email', password: 'valid_password' })
  })

  test('Should return 500 if authentication.auth throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(addAccountUseCaseStub, 'add').mockResolvedValueOnce(addAccountModelUseCaseMock)

    const signUpController = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)
    jest.spyOn(authenticationUseCaseStub, 'auth').mockReturnValueOnce(Promise.reject(new Error('fake error')))

    const httpResponse = await signUpController.handle(requestMock)
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(addAccountUseCaseStub, 'add').mockResolvedValueOnce(addAccountModelUseCaseMock)
    jest.spyOn(authenticationUseCaseStub, 'auth').mockResolvedValueOnce(authModelMock)

    const signUpController = new SignUpController(addAccountUseCaseStub, validationStub, authenticationUseCaseStub)

    const httpResponse = await signUpController.handle(requestMock)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name', isAdmin: true }))
  })
})
