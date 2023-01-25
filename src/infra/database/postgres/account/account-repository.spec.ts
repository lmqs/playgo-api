import { AddAccountModel } from 'domain/usecases/add-account'
import { AccountPostgresRepository } from './account-repository'

type SutTypes = {
  sut: AccountPostgresRepository
}

const makeSut = (): SutTypes => {
  const sut = new AccountPostgresRepository()
  return {
    sut
  }
}

describe('Account Postgres Repository', () => {
  let accountDataGenericMock: AddAccountModel

  beforeEach(() => {
    accountDataGenericMock = {
      name: 'valid_name',
      user: 'valid_user',
      password: 'valid_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number'
    }
  })
  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const { sut } = makeSut()

      const accountDataMock = { id: 'valid_id', ...accountDataGenericMock }
      sut.create = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.add(accountDataGenericMock)

      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        user: 'valid_user',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number'
      })
    })
  })

  describe('loadByUser()', () => {
    test('Should return an account on add success', async () => {
      const { sut } = makeSut()
      const accountDataMock = { id: 'valid_id', ...accountDataGenericMock }
      sut.findOne = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.loadByUser('valid_user')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        user: 'valid_user',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number'
      })
    })

    test('Should return undefined if loadByUser fails', async () => {
      const { sut } = makeSut()
      sut.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadByUser('valid_user')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken success whithout role', async () => {
      const { sut } = makeSut()
      const accountDataMock = [{ id: 'valid_id', ...accountDataGenericMock }]
      sut.findGeneric = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.loadByToken('any_token')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        user: 'valid_user',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number'
      })
    })
    test('Should return an account on loadByToken success with role', async () => {
      const { sut } = makeSut()
      const accountDataMock = [{ id: 'valid_id', ...accountDataGenericMock }]
      sut.findGeneric = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        user: 'valid_user',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number'
      })
    })

    test('Should return undefined if loadByToken fails', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadByToken('any_token')
      await expect(promise).rejects.toThrow()
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const { sut } = makeSut()
      sut.findGeneric = jest.fn().mockReturnValue([])

      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toBeUndefined()
    })

    test('Should return an account on loadByToken with if user is admin role', async () => {
      const { sut } = makeSut()
      const accountDataMock = [{ id: 'valid_id', role: 'admin', ...accountDataGenericMock }]
      sut.findGeneric = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.loadByToken('any_token')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        user: 'valid_user',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        role: 'admin'
      })
    })
  })
})
