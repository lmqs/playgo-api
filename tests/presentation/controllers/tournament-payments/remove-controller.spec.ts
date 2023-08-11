import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/presentation/validation/validators'
import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { IRemoveTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'
import { TournamentPaymentsPostgresRepository } from '@/infra/database/postgres/tournament-payments/tournament-payments-repository'
import { DbRemoveTournamentPayments } from '@/data/usescases/tournament-payments/remove'
import { RemoveTournamentPaymentsController } from '@/presentation/controllers/tournament-payments/remove'
import { removeRequestMock } from './tournament-payments-mock'

describe('RemoveTournamentPayments Controller', () => {
  let repo: ITournamentPaymentsRepository
  let useCase: IRemoveTournamentPaymentsUseCase
  let validation: Validation

  beforeEach(async () => {
    repo = new TournamentPaymentsPostgresRepository()
    const validations: Validation[] = []

    validation = new ValidationComposite(validations)
    useCase = new DbRemoveTournamentPayments(repo)
  })

  test('Should return 400 if Validation returns an error', async () => {
    jest.spyOn(validation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const controller = new RemoveTournamentPaymentsController(validation, useCase)

    const httpResponse = await controller.handle(removeRequestMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
    expect(validation.validate).toHaveBeenCalledWith({ id: '1' })
  })

  test('Should return 500 if removeTournamentSponsor.remove throws', async () => {
    const controller = new RemoveTournamentPaymentsController(validation, useCase)
    jest.spyOn(useCase, 'remove').mockImplementation(() => { throw new Error() })

    const httpResponse = await controller.handle(removeRequestMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(useCase, 'remove').mockResolvedValueOnce(true)

    const controller = new RemoveTournamentPaymentsController(validation, useCase)
    const httpResponse = await controller.handle(removeRequestMock)
    expect(httpResponse).toEqual(ok(true))
  })
})
