import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { IAccountRepository, ICategoryRepository } from '@/data/protocols/db'
import { ValidationComposite } from '@/presentation/validation/validators'
import { RegistrationsAthletePostgresRepository } from '@/infra/database/postgres/registrations/registrations-athlete-repository'
import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { AccountPostgresRepository } from '@/infra/database/postgres/account/account-repository'
import { AddRegistrationsController } from '@/presentation/controllers/registration/add-registrations-controller'
import { AddRegistrationsUseCase } from '@/data/usescases/registrations/db-add-registrations'
import { IAddRegistrations } from '@/domain/usecases/registration/add-registrations'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'
import { IRegistrationsWaitingRepository } from '@/data/protocols/db/registrations-waiting-repository'
import { IRegistrationsAthleteWaitingRepository } from '@/data/protocols/db/registrations-athlete-waiting-repository'
import { addResultMock, requestMock } from './add-registration-mock'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'

describe('AddRegistrationsController Controller', () => {
  let useCase: IAddRegistrations
  let categoryRepo: ICategoryRepository
  let accountRepository: IAccountRepository
  let tournamentRepo: ITournamentRepository
  let registrationsRepo: IRegistrationsRepository
  let registrationsAthleteRepository: IRegistrationsAthleteRepository
  let registrationsWaitingRepo: IRegistrationsWaitingRepository
  let registrationsAthleteWaitingRepo: IRegistrationsAthleteWaitingRepository
  let validation: Validation

  beforeEach(async () => {
    registrationsAthleteRepository = new RegistrationsAthletePostgresRepository()
    accountRepository = new AccountPostgresRepository()
    const validations: Validation[] = []

    validation = new ValidationComposite(validations)
    useCase = new AddRegistrationsUseCase(
      categoryRepo, tournamentRepo, accountRepository, registrationsRepo,
      registrationsAthleteRepository, registrationsWaitingRepo, registrationsAthleteWaitingRepo
    )
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(useCase, 'add').mockResolvedValueOnce([])

    const controller = new AddRegistrationsController(validation, useCase)
    const validationStub = jest.spyOn(validation, 'validate')

    await controller.handle(requestMock)
    expect(validationStub).toHaveBeenCalledWith(requestMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const controller = new AddRegistrationsController(validation, useCase)

    jest.spyOn(validation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call add with correct values', async () => {
    const controller = new AddRegistrationsController(validation, useCase)
    jest.spyOn(useCase, 'add').mockResolvedValueOnce([])

    await controller.handle(requestMock)
    expect(useCase.add).toHaveBeenCalledWith(requestMock)
  })

  test('Should return 500 if add throws', async () => {
    const controller = new AddRegistrationsController(validation, useCase)
    jest.spyOn(useCase, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 error if add throws ParamsInUseError', async () => {
    const controller = new AddRegistrationsController(validation, useCase)
    jest.spyOn(useCase, 'add').mockImplementationOnce(() => {
      throw new ParamInUseError('any_field')
    })

    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('any_field')))
  })

  test('Should return 200 when controller is success', async () => {
    jest.spyOn(useCase, 'add').mockResolvedValueOnce(addResultMock)

    const controller = new AddRegistrationsController(validation, useCase)
    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(ok(addResultMock))
  })
})
