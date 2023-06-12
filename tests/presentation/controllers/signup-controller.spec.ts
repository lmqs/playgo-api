import { Authentication } from '@/domain/usecases/authentication/authentication'
import { AddAccount } from '@/domain/usecases/account/add-account'
import { MissingParamError, EmailInUseError } from '@/presentation/errors'
import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { ok, badRequest, serverError, forbidden } from '@/presentation/helpers/http/http-helper'
import { mockAccountModel } from '@/tests/domain/mocks'
import { Validation } from '@/presentation/protocols'

const makeFakerRequest = (): SignUpController.Request => ({
  name: 'valid_name',
  gender: 'valid_gender',
  password: 'valid_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number'
})

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: Authentication.Params): Promise<Authentication.Result> {
      return await new Promise(resolve => { resolve({ accessToken: 'any_token', name: 'any_name' }) })
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
    async validate (input: any): Promise<Error> {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}
const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccount.Params): Promise<AddAccount.Result> {
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
  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle(makeFakerRequest())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      gender: 'valid_gender',
      password: 'valid_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 200 if valid data is provider', async () => {
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

  test('Should call Authentication with correct params', async () => {
    const { sut, authStub } = makeSut()
    const authSpy = jest.spyOn(authStub, 'auth')

    await sut.handle(makeFakerRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'valid_email', password: 'valid_password' })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authStub } = makeSut()
    jest.spyOn(authStub, 'auth').mockReturnValueOnce(
      new Promise((resolve, reject) => { reject(new Error('fake error')) })
    )
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 403 if addAccount returns custom error', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { resolve(new EmailInUseError()) }))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })
})
