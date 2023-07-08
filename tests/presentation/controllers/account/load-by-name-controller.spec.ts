import { ILoadAccountByName } from '@/domain/usecases/account/load-account-by-name'
import { DbLoadAccountByNameUseCase } from '@/data/usescases/account/db-load-account-by-name'
import { MissingParamError } from '@/presentation/errors'
import { ok, badRequest, serverError } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { ValidationComposite } from '@/presentation/validation/validators'
import { loadByNameMock, requestLoadByNameMock } from './account-mock'
import { LoadAccountByNameController } from '@/presentation/controllers/account/load-by-name-controller'

describe('LoadAccountByName Controller', () => {
  let validationStub: Validation
  let loadAccountByNameUseCaseStub: ILoadAccountByName

  beforeEach(() => {
    const accountRepository = new AccountPostgresRepository()
    loadAccountByNameUseCaseStub = new DbLoadAccountByNameUseCase(accountRepository)

    const validations: Validation[] = []
    validationStub = new ValidationComposite(validations)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(loadAccountByNameUseCaseStub, 'loadByName').mockResolvedValueOnce(loadByNameMock)

    const signUpController = new LoadAccountByNameController(loadAccountByNameUseCaseStub, validationStub)

    const validationSpy = jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    await signUpController.handle(requestLoadByNameMock)
    expect(validationSpy).toHaveBeenCalledTimes(1)
    expect(validationSpy).toHaveBeenCalledWith(requestLoadByNameMock)
  })

  test('Should return 400 if validation returns an error', async () => {
    const signUpController = new LoadAccountByNameController(loadAccountByNameUseCaseStub, validationStub)

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('name')))
    const httpResponse = await signUpController.handle(requestLoadByNameMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should call loadAccountByNameUseCase.loadByName with correct values', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    const signUpController = new LoadAccountByNameController(loadAccountByNameUseCaseStub, validationStub)

    const updateSpy = jest.spyOn(loadAccountByNameUseCaseStub, 'loadByName').mockResolvedValueOnce(loadByNameMock)

    await signUpController.handle(requestLoadByNameMock)
    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(updateSpy).toHaveBeenCalledWith(requestLoadByNameMock.name)
  })

  test('Should return 500 if loadAccountByNameUseCase.loadByName throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)

    const signUpController = new LoadAccountByNameController(loadAccountByNameUseCaseStub, validationStub)
    jest.spyOn(loadAccountByNameUseCaseStub, 'loadByName').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const httpResponse = await signUpController.handle(requestLoadByNameMock)
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 200 if valid account is provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(loadAccountByNameUseCaseStub, 'loadByName').mockResolvedValueOnce(loadByNameMock)

    const signUpController = new LoadAccountByNameController(loadAccountByNameUseCaseStub, validationStub)

    const httpResponse = await signUpController.handle(requestLoadByNameMock)
    expect(httpResponse).toEqual(ok(loadByNameMock))
  })
})
