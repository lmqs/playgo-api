import { AddAccount, AddAccountModel, AccountModel, HttpRequest, Validation } from './signup-protocols'
import { MissingParamError, ServerError } from '../../errors'
import { SignUpController } from './signup'
import { ok, badRequest, serverError } from '../../../presentation/helpers/http-helper'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  user: 'valid_user',
  password: 'valid_password',
  email: 'valid_email',
  cityId: 1,
  phoneNumber: 'valid_number',
  photo: 'valid_photo',
  deleted: true
})

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
  validationStub: Validation
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
    async add (account: AddAccountModel): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(makeFakeAccount()) })
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const validationStub = makeValidation()
  const sut = new SignUpController(addAccountStub, validationStub)
  return {
    sut,
    addAccountStub,
    validationStub
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
    expect(httpResponse).toEqual(ok(makeFakeAccount()))
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
})
