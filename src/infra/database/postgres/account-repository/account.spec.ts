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

  it('Sould return an account on success', async () => {
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
