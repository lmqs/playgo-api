import { DbAddAccountUseCase } from '@/data/usescases/account/db-add-account'
import RabbitmqService from '@/infra/service/rabbitmq-service'
import { Hasher } from '@/data/protocols/criptography'
import { IAccountRepository } from '@/data/protocols/db'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import { ENVIRONMENT } from '@/main/config'
import { addAccountModelMock, dbAccountModelMock } from './account-mock'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('DbAddAccountUseCase UseCase', () => {
  let accountRepoSpy: IAccountRepository
  let bcryptAdapterSpy: Hasher
  let publishInExchangeMock: jest.Mock

  beforeAll(() => {
    ENVIRONMENT.rabbit.routingKeySignup = ''
    ENVIRONMENT.rabbit.exchangeSignup = ''
  })
  beforeEach(async () => {
    publishInExchangeMock = jest.fn().mockReturnValue(true)

    bcryptAdapterSpy = new BcryptAdapter(12)
    accountRepoSpy = new AccountPostgresRepository()
  })

  test('Should call Hasher with correct password', async () => {
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(accountRepoSpy, 'add').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const encryptSpy = jest.spyOn(bcryptAdapterSpy, 'hash')

    const accountUseCase = new DbAddAccountUseCase(bcryptAdapterSpy, accountRepoSpy)

    await accountUseCase.add(addAccountModelMock)
    expect(encryptSpy).toHaveBeenCalledTimes(1)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const accountUseCase = new DbAddAccountUseCase(bcryptAdapterSpy, accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(bcryptAdapterSpy, 'hash').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = accountUseCase.add(addAccountModelMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should call accountRepository.add with correct values', async () => {
    const accountUseCase = new DbAddAccountUseCase(bcryptAdapterSpy, accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(bcryptAdapterSpy, 'hash').mockReturnValueOnce(Promise.resolve('hashed_password'))
    jest.spyOn(accountRepoSpy, 'add').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const addSpy = jest.spyOn(accountRepoSpy, 'add')

    await accountUseCase.add(addAccountModelMock)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      gender: 'valid_gender',
      password: 'hashed_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      dateBirthday: '20/10/2020'
    })
    expect(addSpy).toHaveBeenCalledTimes(1)
  })

  test('Should throw if accountRepository.add throws', async () => {
    const accountUseCase = new DbAddAccountUseCase(bcryptAdapterSpy, accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(bcryptAdapterSpy, 'hash').mockReturnValueOnce(Promise.resolve('hashed_password'))
    jest.spyOn(accountRepoSpy, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = accountUseCase.add(addAccountModelMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should call accountRepository.loadByEmail with correct user', async () => {
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(bcryptAdapterSpy, 'hash').mockReturnValueOnce(Promise.resolve('hashed_password'))
    jest.spyOn(accountRepoSpy, 'add').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    const loadAccountByUserRepositorySpy = jest.spyOn(accountRepoSpy, 'loadByEmail')

    const accountUseCase = new DbAddAccountUseCase(bcryptAdapterSpy, accountRepoSpy)

    await accountUseCase.add(addAccountModelMock)
    expect(loadAccountByUserRepositorySpy).toHaveBeenCalledWith(addAccountModelMock.email)
    expect(loadAccountByUserRepositorySpy).toHaveBeenCalledTimes(1)
  })

  test('Should return custom error if accountRepository.loadByEmail not return empty', async () => {
    const accountUseCase = new DbAddAccountUseCase(bcryptAdapterSpy, accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))
    const promise = accountUseCase.add(addAccountModelMock)

    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on success', async () => {
    const accountUseCase = new DbAddAccountUseCase(bcryptAdapterSpy, accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(bcryptAdapterSpy, 'hash').mockReturnValueOnce(Promise.resolve('hashed_password'))
    jest.spyOn(accountRepoSpy, 'add').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    const account = await accountUseCase.add(addAccountModelMock)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      gender: 'valid_gender',
      password: 'hashed_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      deleted: true,
      dateBirthday: '20/10/2020'
    })
  })

  test('Should add account user in queue service on success', async () => {
    ENVIRONMENT.rabbit.routingKeySignup = 'routing_key'
    ENVIRONMENT.rabbit.exchangeSignup = 'exchange_signup'

    const queueMock = RabbitmqService.getInstance()
    if (queueMock) queueMock.publishInExchange = publishInExchangeMock

    const accountUseCase = new DbAddAccountUseCase(bcryptAdapterSpy, accountRepoSpy)
    jest.spyOn(accountRepoSpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(bcryptAdapterSpy, 'hash').mockReturnValueOnce(Promise.resolve('hashed_password'))
    jest.spyOn(accountRepoSpy, 'add').mockReturnValueOnce(Promise.resolve(dbAccountModelMock))

    await accountUseCase.add(addAccountModelMock)
    expect(publishInExchangeMock).toHaveBeenCalledTimes(1)
    expect(publishInExchangeMock).toHaveBeenCalledWith(
      'exchange_signup', 'routing_key', JSON.stringify({ id: 'valid_id', email: 'valid_email' })
    )
  })
})
