import { LoadAccountByToken } from '../../../../domain/usecases/account/load-account-by-token'
import { Decrypter } from '../../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../../protocols/db/account/load-account-by-token-repository'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { mockAccountModel } from '../../../../domain/test'
import { mockLoadAccountByTokenRepository } from '../../../test'

type SutTypes = {
  sut: LoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string | undefined> {
      return await new Promise(resolve => { resolve('any_token') })
    }
  }
  return new DecrypterStub()
}

const makeSut = (): SutTypes => {
  const decrypterStub = makeDecrypter()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}
describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return undefined if Decrypter returns undefined', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => { resolve(undefined) }))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeUndefined()
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeUndefined()
  })

  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should call LoadAccountByToken with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const loadAccountByTokenRepositorySpy = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(loadAccountByTokenRepositorySpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return undefined if LoadAccountByTokenRepository returns undefined', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => { resolve(undefined) }))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeUndefined()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(mockAccountModel())
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
