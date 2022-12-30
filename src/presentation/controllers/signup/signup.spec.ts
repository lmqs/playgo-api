import { AddAccount, AddAccountModel, AccountModel, HttpRequest } from './signup-protocols'
import { MissingParamError, InvalidParamError, ServerError } from '../../errors'
import { SignUpController } from './signup'

interface SutTypes {
  sut: SignUpController
  addAccountStub: AddAccount
}
const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        user: 'valid_user',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo',
        deleted: true
      }
      return await new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(addAccountStub)
  return {
    sut,
    addAccountStub
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

  test('Should return 400 if no user is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('user'))
  })

  test('Should return 400 if no name is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        user: 'user',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })
  test('Should return 400 if no password is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        user: 'user',
        name: 'name',
        passwordConfirmation: 'passwordConfirmation'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return 400 if no passwordConfirmation is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        user: 'user',
        name: 'name',
        password: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Should return 400 if no email is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        user: 'user',
        name: 'name',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return 400 if no cityId is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        user: 'user',
        name: 'name',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation',
        email: 'email'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cityId'))
  })

  test('Should return 400 if no phoneNumber is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        user: 'user',
        name: 'name',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation',
        email: 'email',
        cityId: 'cityId'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('phoneNumber'))
  })

  test('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'name',
        user: 'user',
        password: 'password',
        passwordConfirmation: 'passwordConfirmation',
        email: 'email',
        cityId: 'cityId',
        phoneNumber: 'phoneNumber'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'))
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
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if valid data is provider', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(httpRequestGenericMock)

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
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
  })
})
