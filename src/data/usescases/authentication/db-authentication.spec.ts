import { AuthenticationModel } from '../../../domain/usecases/authentication'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { HashComparer, TokenGenerator } from '../protocols/criptography'
import { UpdateAccessTokenRepository, LoadAccountByUserRepository } from '../protocols/db'
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
  hashComparerStub: HashComparer
  tokenGeneratorStub: TokenGenerator
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update (id: string, token: string): Promise<void> {
      await new Promise<void>(resolve => { resolve() })
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return await new Promise(resolve => { resolve('any_token') })
    }
  }
  return new TokenGeneratorStub()
}
const makeLoadAccountByUserRepository = (): LoadAccountByUserRepository => {
  class LoadAccountByUserRepository implements LoadAccountByUserRepository {
    async load (user: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByUserRepository()
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise((resolve) => { resolve(true) })
    }
  }
  return new HashComparerStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByUserRepositoryStub = makeLoadAccountByUserRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeTokenGenerator()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByUserRepositoryStub, hashComparerStub, tokenGeneratorStub, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountByUserRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
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

  test('Sould return null if LoadAccountByUserRepository returns null', async () => {
    const { sut, loadAccountByUserRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByUserRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve) => { resolve(undefined) }))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeUndefined()
  })

  test('Sould call hashComparer with correct password', async () => {
    const { sut, hashComparerStub } = makeSut()
    const hashComparerStubSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(hashComparerStubSpy).toHaveBeenCalledWith(makeFakeAuthentication().password, makeFakeAccount().password)
  })

  test('Sould throw if hashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Sould return null if hashComparer returns null', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve) => { resolve(false) }))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeUndefined()
  })

  test('Sould call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const tokenGeneratorSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth(makeFakeAuthentication())
    expect(tokenGeneratorSpy).toHaveBeenCalledWith(makeFakeAccount().id)
  })

  test('Sould throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Sould call TokenGenerator with correct id', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBe('any_token')
  })

  test('Sould call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const tokenGeneratorSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update')
    await sut.auth(makeFakeAuthentication())
    expect(tokenGeneratorSpy).toHaveBeenCalledWith(makeFakeAccount().id, 'any_token')
  })

  test('Sould throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'update').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
