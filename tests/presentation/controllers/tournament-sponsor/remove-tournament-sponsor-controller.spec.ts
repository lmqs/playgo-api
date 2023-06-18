import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { ValidationComposite } from '@/presentation/validation/validators'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { IRemoveTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
import { RemoveTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'
import { requestRemoveTournamentSponsorControllerMock } from './tournament-mock'
import { RemoveTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor/db-remove-tournament-sponsor'

describe('RemoveTournamentSponsor Controller', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository
  let removeTournamentSponsorUseCase: IRemoveTournamentSponsor
  let validation: Validation

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
    const validations: Validation[] = []

    validation = new ValidationComposite(validations)
    removeTournamentSponsorUseCase = new RemoveTournamentSponsorUseCase(tournamentSponsorRepo)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(removeTournamentSponsorUseCase, 'remove').mockResolvedValueOnce()

    const removeTournamentSponsorController = new RemoveTournamentSponsorController(validation, removeTournamentSponsorUseCase)
    const validationStub = jest.spyOn(validation, 'validate')

    await removeTournamentSponsorController.handle(requestRemoveTournamentSponsorControllerMock)
    expect(validationStub).toHaveBeenCalledWith({ id: 'valid_id' })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const removeTournamentSponsorController = new RemoveTournamentSponsorController(validation, removeTournamentSponsorUseCase)

    jest.spyOn(validation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await removeTournamentSponsorController.handle(requestRemoveTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call removeTournamentSponsor.remove with correct values', async () => {
    const removeTournamentSponsorController = new RemoveTournamentSponsorController(validation, removeTournamentSponsorUseCase)
    const removeSpy = jest.spyOn(removeTournamentSponsorUseCase, 'remove').mockResolvedValueOnce()

    await removeTournamentSponsorController.handle(requestRemoveTournamentSponsorControllerMock)
    expect(removeSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return 500 if removeTournamentSponsor.remove throws', async () => {
    const removeTournamentSponsorController = new RemoveTournamentSponsorController(validation, removeTournamentSponsorUseCase)
    jest.spyOn(removeTournamentSponsorUseCase, 'remove').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await removeTournamentSponsorController.handle(requestRemoveTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(removeTournamentSponsorUseCase, 'remove').mockResolvedValueOnce()

    const removeTournamentSponsorController = new RemoveTournamentSponsorController(validation, removeTournamentSponsorUseCase)
    const httpResponse = await removeTournamentSponsorController.handle(requestRemoveTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(noContent())
  })
})
