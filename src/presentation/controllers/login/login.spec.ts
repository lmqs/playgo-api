import { MissingParamError, ServerError, UnauthorizedError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/http-helper'
import { LoginController } from './login'
import { HttpRequest, Authentication } from './login-protocols'

const makeFakerRequest = (): HttpRequest => ({
  body: {
    user: 'valid_user',
    password: 'valid_password'
  }
})

interface SutTypes {
  sut: LoginController
  authStub: Authentication
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (user: string, password: string): Promise<string> {
      return await new Promise(resolve => { resolve('any_token') })
    }
  }
  return new AuthenticationStub()
}
const makeSut = (): SutTypes => {
  const authStub = makeAuthentication()
  const sut = new LoginController(authStub)
  return {
    sut,
    authStub
  }
}

describe('SignUP Controller', () => {
  test('Should return 400 if no user is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'valid_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('user')))
  })

  test('Should return 400 if no password is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        user: 'valid_user'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Should call Authentication with correct params', async () => {
    const { sut, authStub } = makeSut()
    const authSpy = jest.spyOn(authStub, 'auth')

    await sut.handle(makeFakerRequest())
    expect(authSpy).toHaveBeenCalledWith('valid_user', 'valid_password')
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
})
