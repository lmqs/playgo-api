import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, ok, unauthorized } from '@/presentation/helpers/http/http-helper'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Authentication, Validation } from '@/presentation/controllers/login/login-controller-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    async validate (input: any): Promise<Error> {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}
const makeFakerRequest = (): LoginController.Request => ({
  email: 'valid_email',
  password: 'valid_password'
})

type SutTypes = {
  sut: LoginController
  authStub: Authentication
  validationStub: Validation
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
      return await new Promise(resolve => { resolve({ accessToken: 'any_token', name: 'any_name' }) })
    }
  }
  return new AuthenticationStub()
}

const makeSut = (): SutTypes => {
  const authStub = makeAuthentication()
  const validationStub = makeValidation()
  const sut = new LoginController(authStub, validationStub)
  return {
    sut,
    authStub,
    validationStub
  }
}

describe('SignUP Controller', () => {
  test('Should call Authentication with correct params', async () => {
    const { sut, authStub } = makeSut()
    const authSpy = jest.spyOn(authStub, 'auth')

    await sut.handle(makeFakerRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'valid_email', password: 'valid_password' })
  })

  test('Should return 401 if invalid credentials are provider', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'auth').mockReturnValueOnce(new Promise(resolve => { resolve(undefined) }))

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'auth').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error()) })
    )

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token', name: 'any_name' }))
  })

  test('Should call validation.validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const addSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeFakerRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakerRequest())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })
})
