import { AddAccountModel } from 'domain/usecases/add-account'
import { AccountPostgresRepository } from './account-repository'

interface SutTypes {
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
