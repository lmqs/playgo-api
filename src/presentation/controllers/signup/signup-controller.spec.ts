import {
  AddAccount, AddAccountParams, AccountModel, HttpRequest, Validation, Authentication, AuthenticationParams
} from './signup-controller-protocols'
import { MissingParamError, ServerError, EmailInUseError } from '../../errors'
import { SignUpController } from './signup-controller'
import { ok, badRequest, serverError, forbidden } from '../../helpers/http/http-helper'
import { mockAccountModel } from '../../../domain/test'

const makeFakerRequest = (): HttpRequest => ({
  body: {
    user: 'valid_user',
    password: 'valid_password'
  }
})

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationParams): Promise<string> {
      return await new Promise(resolve => { resolve('any_token') })
    }
  }
  return new AuthenticationStub()
}
type SutTypes = {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
  authStub: Authentication
}
const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}
const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const authStub = makeAuthentication()
  const sut = new SignUpController(addAccountStub, validationStub, authStub)
  return {
    sut,
    addAccountStub,
    validationStub,
    authStub
  }
}

describe('SignUP Controller', () => {
  let httpRequestGenericMock: HttpRequest

  beforeEach(() => {
    httpRequestGenericMock = {
      body: {
        name: 'valid_name',
        user: 'valid_user',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number'
      }
    }
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(httpRequestGenericMock)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      user: 'valid_user',
      password: 'valid_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(httpRequestGenericMock)
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if valid data is provider', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(httpRequestGenericMock)
    expect(httpResponse).toEqual(ok({ accessToken: 'any_token' }))
  })

  test('Should call validation.validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const addSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(httpRequestGenericMock)
    expect(addSpy).toHaveBeenCalledWith(httpRequestGenericMock.body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_filed'))
    const httpResponse = await sut.handle(httpRequestGenericMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call Authentication with correct params', async () => {
    const { sut, authStub } = makeSut()
    const authSpy = jest.spyOn(authStub, 'auth')

    await sut.handle(makeFakerRequest())
    expect(authSpy).toHaveBeenCalledWith({ user: 'valid_user', password: 'valid_password' })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'auth').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error()) })
    )
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 403 if addAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { resolve(undefined) }))
    const httpResponse = await sut.handle(httpRequestGenericMock)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
})
