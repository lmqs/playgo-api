import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { ValidationComposite } from '@/presentation/validation/validators'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { AddTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor'
import { IAddTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
import { AddTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'
import { requestAddTournamentSponsorControllerMock, tournamentSponsorMock } from './tournament-mock'

describe('AddTournamentSponsor Controller', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository
  let addTournamentSponsorUseCase: IAddTournamentSponsor
  let validation: Validation

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
    const validations: Validation[] = []

    validation = new ValidationComposite(validations)
    addTournamentSponsorUseCase = new AddTournamentSponsorUseCase(tournamentSponsorRepo)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(addTournamentSponsorUseCase, 'add').mockResolvedValueOnce(tournamentSponsorMock)

    const addTournamentSponsorController = new AddTournamentSponsorController(validation, addTournamentSponsorUseCase)
    const validationStub = jest.spyOn(validation, 'validate')

    await addTournamentSponsorController.handle(requestAddTournamentSponsorControllerMock)
    expect(validationStub).toHaveBeenCalledWith(requestAddTournamentSponsorControllerMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const addTournamentSponsorController = new AddTournamentSponsorController(validation, addTournamentSponsorUseCase)

    jest.spyOn(validation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await addTournamentSponsorController.handle(requestAddTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call addTournamentSponsor.add with correct values', async () => {
    const addTournamentSponsorController = new AddTournamentSponsorController(validation, addTournamentSponsorUseCase)
    const addSpy = jest.spyOn(addTournamentSponsorUseCase, 'add').mockResolvedValueOnce(tournamentSponsorMock)

    await addTournamentSponsorController.handle(requestAddTournamentSponsorControllerMock)
    expect(addSpy).toHaveBeenCalledWith(requestAddTournamentSponsorControllerMock)
  })

  test('Should return 500 if addTournamentSponsor.add throws', async () => {
    const addTournamentSponsorController = new AddTournamentSponsorController(validation, addTournamentSponsorUseCase)
    jest.spyOn(addTournamentSponsorUseCase, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await addTournamentSponsorController.handle(requestAddTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(addTournamentSponsorUseCase, 'add').mockResolvedValueOnce(tournamentSponsorMock)

    const addTournamentSponsorController = new AddTournamentSponsorController(validation, addTournamentSponsorUseCase)
    const httpResponse = await addTournamentSponsorController.handle(requestAddTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(
      ok(tournamentSponsorMock)
    )
  })
})
