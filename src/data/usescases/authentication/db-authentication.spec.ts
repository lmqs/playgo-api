import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { LoadAccountByUserRepository } from '../protocols/db/log-account-by-user-repository'
import { DbAuthentication } from './db-authentication'

const makeFakeAuthentication = (): AuthenticationModel => ({
  user: 'any_user',
  password: 'any_password'
})

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
  sut: DbAuthentication
  loadAccountByUserRepositoryStub: LoadAccountByUserRepository
}

const makeLoadAccountByUserRepository = (): LoadAccountByUserRepository => {
  class LoadAccountByUserRepository implements LoadAccountByUserRepository {
    async load (user: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByUserRepository()
}
const makeSut = (): SutTypes => {
  const loadAccountByUserRepositoryStub = makeLoadAccountByUserRepository()
  const sut = new DbAuthentication(loadAccountByUserRepositoryStub)
  return {
    sut,
    loadAccountByUserRepositoryStub
  }
}

describe('DbAddAccount UseCase', () => {
  test('Sould call LoadAccountByUserRepository with correct user', async () => {
    const { sut, loadAccountByUserRepositoryStub } = makeSut()
    const loadAccountByUserRepositorySpy = jest.spyOn(loadAccountByUserRepositoryStub, 'load')
    await sut.auth(makeFakeAuthentication())
    expect(loadAccountByUserRepositorySpy).toHaveBeenCalledWith(makeFakeAuthentication().user)
  })
  test('Sould throw if LoadAccountByUserRepository throws', async () => {
    const { sut, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByUserRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
  // test('Sould call LoadAccountByUserRepository with correct user', async () => {
  //   const { sut, loadAccountByUserRepositoryStub } = makeSut()
  //   const loadAccountByUserRepositorySpy = jest.spyOn(loadAccountByUserRepositoryStub, 'load')
  //   await sut.auth(makeFakeAuthentication())
  //   expect(loadAccountByUserRepositorySpy).toHaveBeenCalledWith(makeFakeAuthentication().user)
  // })
})
