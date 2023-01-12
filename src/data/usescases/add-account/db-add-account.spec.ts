import { LoadAccountByUserRepository } from '../protocols/db/account'
import { DbAddAccount } from './db-add-account'
import { AccountModel, AddAccountModel, Hasher, AddAccountRepository } from './db-add-account-protocols'

const makeFakeAccount = (): AccountModel => ({
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
interface SutTypes {
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
const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (addAccountModel: AddAccountModel): Promise<AccountModel> {
      return {
        id: 'valid_id',
        name: 'valid_name',
        user: 'valid_user',
        password: 'hashed_password',
        email: 'valid_email',
        cityId: 1,
        phoneNumber: 'valid_number',
        photo: 'valid_photo',
        deleted: true
      }
    }
  }
  return new AddAccountRepositoryStub()
}

const makeLoadAccountByUserRepository = (): LoadAccountByUserRepository => {
  class LoadAccountByUserRepository implements LoadAccountByUserRepository {
    async loadByUser (user: string): Promise<AccountModel | undefined> {
      return undefined
    }
  }
  return new LoadAccountByUserRepository()
}
const makeSut = (): SutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByUserRepositoryStub = makeLoadAccountByUserRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByUserRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByUserRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  let accountDataGenericMock: AddAccountModel

  beforeEach(() => {
    accountDataGenericMock = {
      name: 'valid_name',
      user: 'valid_user',
      password: 'valid_password',
      email: 'valid_email',
      cityId: 1,
      phoneNumber: 'valid_number',
      photo: 'valid_photo',
      deleted: true
    }
  })

  test('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const encryptSpy = jest.spyOn(hasherStub, 'hash')
    await sut.add(accountDataGenericMock)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(accountDataGenericMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(accountDataGenericMock)
    expect(addSpy).toHaveBeenCalledWith({
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

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(accountDataGenericMock)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an account on Sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.add(accountDataGenericMock)
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
    await sut.add(accountDataGenericMock)
    expect(loadAccountByUserRepositorySpy).toHaveBeenCalledWith(accountDataGenericMock.user)
  })

  test('Should return undefined if LoadAccountByUserRepository not return empty', async () => {
    const { sut, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByUserRepositoryStub, 'loadByUser').mockReturnValueOnce(new Promise(resolve => { resolve(makeFakeAccount()) }))
    const accessToken = await sut.add(accountDataGenericMock)

    expect(accessToken).toBeUndefined()
  })
})
