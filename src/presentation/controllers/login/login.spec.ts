import { MissingParamError, ServerError, UnauthorizedError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Validation } from '../signup/signup-protocols'
import { LoginController } from './login'
import { HttpRequest, Authentication, AuthenticationModel } from './login-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}
const makeFakerRequest = (): HttpRequest => ({
  body: {
    user: 'valid_user',
    password: 'valid_password'
  }
})

interface SutTypes {
  sut: LoginController
  authStub: Authentication
  validationStub: Validation
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationModel): Promise<string> {
      return await new Promise(resolve => { resolve('any_token') })
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
    expect(authSpy).toHaveBeenCalledWith({ user: 'valid_user', password: 'valid_password' })
  })

  test('Should return 401 if invalid credentials are provider', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'auth').mockReturnValueOnce(new Promise(resolve => { resolve('') }))

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(badRequest(new UnauthorizedError()))
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
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call validation.validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const addSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeFakerRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakerRequest().body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_filed'))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })
})
