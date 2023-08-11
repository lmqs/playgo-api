import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/presentation/validation/validators'
import { addModelMock, addRequestMock } from './tournament-payments-mock'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'
import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { IAddTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'
import { DbAddTournamentPayments } from '@/data/usescases/tournament-payments/add'
import { AddTournamentPaymentsController } from '@/presentation/controllers/tournament-payments/add'

describe('AddTournamentPayments Controller', () => {
  let repo: ITournamentPaymentsRepository
  let useCase: IAddTournamentPaymentsUseCase
  let validation: Validation

  beforeEach(async () => {
    repo = new TournamentPaymentsPostgresRepository()
    const validations: Validation[] = []

    validation = new ValidationComposite(validations)
    useCase = new DbAddTournamentPayments(repo)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const controller = new AddTournamentPaymentsController(validation, useCase)

    jest.spyOn(validation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await controller.handle(addRequestMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
    expect(validation.validate).toHaveBeenCalledWith(addRequestMock)
  })

  test('Should return 500 if IAddTournamentPaymentsUseCase.add throws', async () => {
    const controller = new AddTournamentPaymentsController(validation, useCase)
    jest.spyOn(useCase, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await controller.handle(addRequestMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(useCase, 'add').mockResolvedValueOnce(addModelMock)

    const controller = new AddTournamentPaymentsController(validation, useCase)
    const httpResponse = await controller.handle(addRequestMock)
    expect(httpResponse).toEqual(ok(addModelMock))
    expect(useCase.add).toHaveBeenCalledWith(addRequestMock)
  })
})
