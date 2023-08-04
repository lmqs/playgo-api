import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { IAccountRepository } from '@/data/protocols/db'
import { ValidationComposite } from '@/presentation/validation/validators'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'
import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { LoadRegistrationByCategoryIdUseCase } from '@/data/usescases/registrations/db-load-by-category-id'
import { ILoadRegistrationByCategoryId } from '@/domain/usecases/registration/load-by-category-id '
import { loadByCategoryIdMock, requestMock } from './load-by-category-mock'
import { LoadRegistrationsByCategoryController } from '@/presentation/controllers/registration/load-by-category-controller'

describe('LoadRegistrationsByCategoryController Controller', () => {
  let registrationsAthleteRepository: IRegistrationsAthleteRepository
  let accountRepository: IAccountRepository
  let useCase: ILoadRegistrationByCategoryId
  let validation: Validation

  beforeEach(async () => {
    registrationsAthleteRepository = new RegistrationsAthletePostgresRepository()
    accountRepository = new AccountPostgresRepository()
    const validations: Validation[] = []

    validation = new ValidationComposite(validations)
    useCase = new LoadRegistrationByCategoryIdUseCase(registrationsAthleteRepository, accountRepository)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(useCase, 'loadByCategoryId').mockResolvedValueOnce([])

    const controller = new LoadRegistrationsByCategoryController(validation, useCase)
    const validationStub = jest.spyOn(validation, 'validate')

    await controller.handle(requestMock)
    expect(validationStub).toHaveBeenCalledWith(requestMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const controller = new LoadRegistrationsByCategoryController(validation, useCase)

    jest.spyOn(validation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call removeTournamentSponsor.loadByCategoryId with correct values', async () => {
    const controller = new LoadRegistrationsByCategoryController(validation, useCase)
    jest.spyOn(useCase, 'loadByCategoryId').mockResolvedValueOnce([])

    await controller.handle(requestMock)
    expect(useCase.loadByCategoryId).toHaveBeenCalledWith(requestMock)
  })

  test('Should return 500 if removeTournamentSponsor.loadByCategoryId throws', async () => {
    const controller = new LoadRegistrationsByCategoryController(validation, useCase)
    jest.spyOn(useCase, 'loadByCategoryId').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 when controller is success', async () => {
    jest.spyOn(useCase, 'loadByCategoryId').mockResolvedValueOnce(loadByCategoryIdMock)

    const controller = new LoadRegistrationsByCategoryController(validation, useCase)
    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(ok(loadByCategoryIdMock))
  })
})
