import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { addAccountParamsMock, dbAccountModelMock, dbAccountModelWithoutRoleMock, dbAddAccountModelMock, updateAccountParamsMock } from './account-repository-mock'

describe('Account Postgres Repository', () => {
  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.create = jest.fn().mockReturnValue(dbAddAccountModelMock)

      const account = await accountRepository.add(addAccountParamsMock)

      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo',
        dateBirthday: '13/06/2023',
        deleted: false,
        role: 'admin',
        accessToken: undefined
      })
    })

    test('Should rethrow if create fails', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = accountRepository.add(addAccountParamsMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on add success', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findOne = jest.fn().mockReturnValue(dbAccountModelMock)

      const account = await accountRepository.loadByEmail('valid_email')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo',
        dateBirthday: '13/06/2023',
        deleted: false,
        role: 'admin',
        accessToken: 'any_token'
      })
    })

    test('Should return undefined if loadByEmail is undefined', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findOne = jest.fn()
      const result = await accountRepository.loadByEmail('valid_email')
      expect(result).toBeUndefined()
      expect(accountRepository.findOne).toBeCalledWith('email', 'valid_email')
    })

    test('Should rethrow if loadByEmail fails', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = accountRepository.loadByEmail('valid_email')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken success without role', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findGeneric = jest.fn().mockReturnValue([dbAccountModelWithoutRoleMock])

      const account = await accountRepository.loadByToken('any_token')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo',
        dateBirthday: '13/06/2023',
        deleted: false,
        role: undefined,
        accessToken: 'any_token'
      })
      expect(accountRepository.findGeneric).toBeCalledWith({ access_token: 'any_token' })
    })

    test('Should return an account on loadByToken success with role', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findGeneric = jest.fn().mockReturnValue([dbAccountModelMock])

      const account = await accountRepository.loadByToken('any_token', 'admin')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo',
        dateBirthday: '13/06/2023',
        deleted: false,
        role: 'admin',
        accessToken: 'any_token'
      })
      expect(accountRepository.findGeneric).toBeCalledWith({ access_token: 'any_token', role: 'admin' })
    })

    test('Should rethrow if loadByToken fails', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findGeneric = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = accountRepository.loadByToken('any_token')
      await expect(promise).rejects.toThrow()
    })

    test('Should return undefined on loadByToken with invalid role', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findGeneric = jest.fn().mockReturnValue([])

      const account = await accountRepository.loadByToken('any_token', 'any_role')
      expect(account).toBeUndefined()
    })
  })

  describe('update()', () => {
    test('Should return an account on add success', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.update = jest.fn().mockReturnValue(dbAddAccountModelMock)

      const account = await accountRepository.updateData(updateAccountParamsMock)

      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo',
        dateBirthday: '13/06/2023',
        deleted: false,
        role: 'admin',
        accessToken: undefined
      })
    })

    test('Should rethrow if create fails', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.update = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = accountRepository.updateData(updateAccountParamsMock)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('loadById()', () => {
    test('Should return an account on loadById success', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findOne = jest.fn().mockReturnValue(dbAccountModelWithoutRoleMock)

      const account = await accountRepository.loadById('valid_id')
      expect(account).toEqual({
        id: 'valid_id',
        name: 'valid_name',
        gender: 'valid_gender',
        password: 'valid_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo',
        dateBirthday: '13/06/2023',
        deleted: false,
        role: undefined,
        accessToken: 'any_token'
      })
      expect(accountRepository.findOne).toBeCalledWith('id', 'valid_id')
    })

    test('Should rethrow if loadById fails', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = accountRepository.loadById('any_token')
      await expect(promise).rejects.toThrow()
    })

    test('Should return undefined on loadById if account is not exists', async () => {
      const accountRepository = new AccountPostgresRepository()
      accountRepository.findOne = jest.fn().mockReturnValue(undefined)

      const account = await accountRepository.loadById('any_id')
      expect(account).toBeUndefined()
    })
  })
})
