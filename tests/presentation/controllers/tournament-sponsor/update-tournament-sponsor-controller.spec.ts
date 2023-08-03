import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { ValidationComposite } from '@/presentation/validation/validators'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { UpdateTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor'
import { IUpdateTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
import { UpdateTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'
import { requestUpdateTournamentSponsorControllerMock, tournamentSponsorMock } from './tournament-mock'

describe('UpdateTournamentSponsor Controller', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository
  let updateTournamentSponsorUseCase: IUpdateTournamentSponsor
  let validation: Validation

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
    const validations: Validation[] = []

    validation = new ValidationComposite(validations)
    updateTournamentSponsorUseCase = new UpdateTournamentSponsorUseCase(tournamentSponsorRepo)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(updateTournamentSponsorUseCase, 'update').mockResolvedValueOnce(tournamentSponsorMock)

    const updateTournamentSponsorController = new UpdateTournamentSponsorController(validation, updateTournamentSponsorUseCase)
    const validationStub = jest.spyOn(validation, 'validate')

    await updateTournamentSponsorController.handle(requestUpdateTournamentSponsorControllerMock)
    expect(validationStub).toHaveBeenCalledWith(requestUpdateTournamentSponsorControllerMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const updateTournamentSponsorController = new UpdateTournamentSponsorController(validation, updateTournamentSponsorUseCase)

    jest.spyOn(validation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await updateTournamentSponsorController.handle(requestUpdateTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call updateTournamentSponsor.update with correct values', async () => {
    const updateTournamentSponsorController = new UpdateTournamentSponsorController(validation, updateTournamentSponsorUseCase)
    const updateSpy = jest.spyOn(updateTournamentSponsorUseCase, 'update').mockResolvedValueOnce(tournamentSponsorMock)

    await updateTournamentSponsorController.handle(requestUpdateTournamentSponsorControllerMock)
    expect(updateSpy).toHaveBeenCalledWith(requestUpdateTournamentSponsorControllerMock)
  })

  test('Should return 500 if updateTournamentSponsor.update throws', async () => {
    const updateTournamentSponsorController = new UpdateTournamentSponsorController(validation, updateTournamentSponsorUseCase)
    jest.spyOn(updateTournamentSponsorUseCase, 'update').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await updateTournamentSponsorController.handle(requestUpdateTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(updateTournamentSponsorUseCase, 'update').mockResolvedValueOnce(tournamentSponsorMock)

    const updateTournamentSponsorController = new UpdateTournamentSponsorController(validation, updateTournamentSponsorUseCase)
    const httpResponse = await updateTournamentSponsorController.handle(requestUpdateTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(
      ok(tournamentSponsorMock)
    )
  })
})
