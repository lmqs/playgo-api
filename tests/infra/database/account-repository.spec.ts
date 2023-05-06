import { mockAddAccountParams } from '@/tests/domain/mocks'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'

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
  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const { sut } = makeSut()

      const accountDataMock = { id: 'valid_id', ...mockAddAccountParams() }
      sut.create = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.add(mockAddAccountParams())

      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo'
      })
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on add success', async () => {
      const { sut } = makeSut()
      const accountDataMock = { id: 'valid_id', ...mockAddAccountParams() }
      sut.findOne = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.loadByEmail('valid_gender')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo'
      })
    })

    test('Should return undefined if loadByEmail fails', async () => {
      const { sut } = makeSut()
      sut.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.loadByEmail('valid_gender')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken success whithout role', async () => {
      const { sut } = makeSut()
      const accountDataMock = [{ id: 'valid_id', ...mockAddAccountParams() }]
      sut.findGeneric = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.loadByToken('any_token')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo'
      })
    })
    test('Should return an account on loadByToken success with role', async () => {
      const { sut } = makeSut()
      const accountDataMock = [{ id: 'valid_id', ...mockAddAccountParams() }]
      sut.findGeneric = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.loadByToken('any_token', 'any_role')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo'
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

    test('Should return an account on loadByToken with if gender is admin role', async () => {
      const { sut } = makeSut()
      const accountDataMock = [{ id: 'valid_id', role: 'admin', ...mockAddAccountParams() }]
      sut.findGeneric = jest.fn().mockReturnValue(accountDataMock)

      const account = await sut.loadByToken('any_token')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        role: 'admin',
        photo: 'valid_photo'
      })
    })
  })
})
