import { mockAddAccountParams, mockAccountModel } from '@/tests/domain/mocks'
import { AddAccountRepository, LoadAccountByEmailRepository } from '@/data/protocols/db/account'
import { DbAddAccount } from '@/data/usescases/account/db-add-account'
import { mockAddAccountRepository, mockLoadAccountByUserRepository } from '../../mocks'
import { EmailInUseError } from '@/presentation/errors'
import RabbitmqService from '@/infra/queue/rabbitmq-service'
import { Hasher } from '@/data/protocols/criptography'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}
const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }
  return new HasherStub()
}

const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByUserRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(RabbitmqService.getInstance(), 'publishInExchange').mockReturnValue(new Promise(resolve => { resolve(true) }))
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(RabbitmqService.getInstance(), 'publishInExchange').mockReturnValue(new Promise(resolve => { resolve(true) }))
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      gender: 'valid_gender',
      password: 'hashed_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on Success', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(RabbitmqService.getInstance(), 'publishInExchange').mockReturnValue(new Promise(resolve => { resolve(true) }))

    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      gender: 'valid_gender',
      password: 'hashed_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      deleted: true
    })
  })

  test('Sould call LoadAccountByUserRepository with correct user', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadAccountByUserRepositorySpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(mockAddAccountParams())
    expect(loadAccountByUserRepositorySpy).toHaveBeenCalledWith(mockAddAccountParams().email)
  })

  test('Should return custom error if LoadAccountByUserRepository not return empty', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const result = await sut.add(mockAddAccountParams())

    expect(result).toEqual(new EmailInUseError())
  })
})
