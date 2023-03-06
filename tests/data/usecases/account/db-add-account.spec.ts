import { mockAddAccountParams, mockAccountModel } from '@/tests/domain/mocks'
import { LoadAccountByUserRepository } from '@/data/protocols/db/account'
import { DbAddAccount } from '@/data/usescases/account/db-add-account'
import { Hasher, AddAccountRepository } from '@/data/usescases/account'
import { mockAddAccountRepository, mockLoadAccountByUserRepository } from '../../mocks'
import { EmailInUseError } from '@/presentation/errors'
import RabbitmqService from '@/infra/queue/rabbitmq-service'

type SutTypes = {
  sut: DbAddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByUserRepositoryStub: LoadAccountByUserRepository
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
  const loadAccountByUserRepositoryStub = mockLoadAccountByUserRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByUserRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByUserRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(RabbitmqService.getInstance(), 'publishInExchange').mockReturnValue(new Promise(resolve => { resolve(true) }))
    jest.spyOn(loadAccountByUserRepositoryStub, 'loadByUser').mockReturnValueOnce(Promise.resolve(undefined))
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(mockAddAccountParams())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByUserRepositoryStub, 'loadByUser').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByUserRepositoryStub, 'loadByUser').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(RabbitmqService.getInstance(), 'publishInExchange').mockReturnValue(new Promise(resolve => { resolve(true) }))
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(mockAddAccountParams())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      user: 'valid_user',
      password: 'hashed_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByUserRepositoryStub, 'loadByUser').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on Sucess', async () => {
    const { sut, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByUserRepositoryStub, 'loadByUser').mockReturnValueOnce(Promise.resolve(undefined))
    jest.spyOn(RabbitmqService.getInstance(), 'publishInExchange').mockReturnValue(new Promise(resolve => { resolve(true) }))

    const account = await sut.add(mockAddAccountParams())
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      user: 'valid_user',
      password: 'hashed_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      deleted: true
    })
  })

  test('Sould call LoadAccountByUserRepository with correct user', async () => {
    const { sut, loadAccountByUserRepositoryStub } = makeSut()
    const loadAccountByUserRepositorySpy = jest.spyOn(loadAccountByUserRepositoryStub, 'loadByUser')
    await sut.add(mockAddAccountParams())
    expect(loadAccountByUserRepositorySpy).toHaveBeenCalledWith(mockAddAccountParams().user)
  })

  test('Should return custom error if LoadAccountByUserRepository not return empty', async () => {
    const { sut, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByUserRepositoryStub, 'loadByUser').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const result = await sut.add(mockAddAccountParams())

    expect(result).toEqual(new EmailInUseError())
  })
})
