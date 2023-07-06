import { DbUpdateAccountUseCase } from '@/data/usescases/account/db-update-account'
import { IAccountRepository } from '@/data/protocols/db'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { updateAccountModelMock, dbAccountModelMock, dbUpdateAccountModelMock } from './account-mock'
import { EmailInUseError } from '@/presentation/errors'

describe('DbUpdateAccountUseCase UseCase', () => {
  let accountRepoSpy: IAccountRepository

  beforeEach(async () => {
    accountRepoSpy = new AccountPostgresRepository()
  })

  test('Should call accountRepository.loadByEmail with correct user', async () => {
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(accountRepoSpy, 'updateData').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    const loadAccountByEmailRepositorySpy = jest.spyOn(accountRepoSpy, 'loadByEmail')

    const accountUseCase = new DbUpdateAccountUseCase(accountRepoSpy)

    await accountUseCase.update(updateAccountModelMock)
    expect(loadAccountByEmailRepositorySpy).toHaveBeenCalledWith(updateAccountModelMock.email)
    expect(loadAccountByEmailRepositorySpy).toHaveBeenCalledTimes(1)
  })

  test('Should return a custom error if accountRepository.loadByEmail returns a record and it is not from the same user', async () => {
    const accountUseCase = new DbUpdateAccountUseCase(accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbUpdateAccountModelMock))
    const promise = accountUseCase.update(updateAccountModelMock)

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw if accountRepository.loadByEmail throws', async () => {
    const accountUseCase = new DbUpdateAccountUseCase(accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = accountUseCase.update(updateAccountModelMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should call accountRepository.updateData with correct values', async () => {
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))

    const accountUseCase = new DbUpdateAccountUseCase(accountRepoSpy)
    const updateSpy = jest.spyOn(accountRepoSpy, 'updateData').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    await accountUseCase.update(updateAccountModelMock)
    expect(updateSpy).toHaveBeenCalledWith({
      id: '2',
      name: 'valid_name',
      gender: 'valid_gender',
      password: 'valid_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      dateBirthday: '20/10/2020'
    })
    expect(updateSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if accountRepository.update throws', async () => {
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(accountRepoSpy, 'updateData').mockReturnValueOnce(Promise.reject(new Error()))
    const accountUseCase = new DbUpdateAccountUseCase(accountRepoSpy)

    const promise = accountUseCase.update(updateAccountModelMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success update', async () => {
    const accountUseCase = new DbUpdateAccountUseCase(accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(accountRepoSpy, 'updateData').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const account = await accountUseCase.update(updateAccountModelMock)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      gender: 'valid_gender',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      dateBirthday: '20/10/2020'
    })
  })
})
