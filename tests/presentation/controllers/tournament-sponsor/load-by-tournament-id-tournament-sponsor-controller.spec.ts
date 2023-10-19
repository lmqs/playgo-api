import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { ITournamentSponsorRepository } from '@/data/protocols/db'
import { ValidationComposite } from '@/presentation/validation/validators'
import { TournamentSponsorPostgresRepository } from '@/infra/database/postgres/tournament-sponsor/tournament-sponsor-repository'
import { ILoadByTournamentIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
import { requestLoadByTournamentIdTournamentSponsorControllerMock, tournamentSponsorMock } from './tournament-mock'
import { LoadByTournamentIdTournamentSponsorUseCase } from '@/data/usescases/tournament_sponsor/db-load-by-tournament-id-tournament-sponsor'
import { LoadByTournamentIdTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'

describe('RemoveTournamentSponsor Controller', () => {
  let tournamentSponsorRepo: ITournamentSponsorRepository
  let loadByTournamentUseCase: ILoadByTournamentIdTournamentSponsor
  let validation: Validation

  beforeEach(async () => {
    tournamentSponsorRepo = new TournamentSponsorPostgresRepository()
    const validations: Validation[] = []

    validation = new ValidationComposite(validations)
    loadByTournamentUseCase = new LoadByTournamentIdTournamentSponsorUseCase(tournamentSponsorRepo)
  })

  test('Should call validation.validate with correct values', async () => {
    jest.spyOn(loadByTournamentUseCase, 'loadByTournamentId').mockResolvedValueOnce([])

    const controller = new LoadByTournamentIdTournamentSponsorController(validation, loadByTournamentUseCase)
    const validationStub = jest.spyOn(validation, 'validate')

    await controller.handle(requestLoadByTournamentIdTournamentSponsorControllerMock)
    expect(validationStub).toHaveBeenCalledWith({ tournamentId: 'valid_id', accountId: '10' })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const controller = new LoadByTournamentIdTournamentSponsorController(validation, loadByTournamentUseCase)

    jest.spyOn(validation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await controller.handle(requestLoadByTournamentIdTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call removeTournamentSponsor.loadByTournamentId with correct values', async () => {
    const controller = new LoadByTournamentIdTournamentSponsorController(validation, loadByTournamentUseCase)
    const loadSpy = jest.spyOn(loadByTournamentUseCase, 'loadByTournamentId').mockResolvedValueOnce([])

    await controller.handle(requestLoadByTournamentIdTournamentSponsorControllerMock)
    expect(loadSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return 500 if removeTournamentSponsor.loadByTournamentId throws', async () => {
    const controller = new LoadByTournamentIdTournamentSponsorController(validation, loadByTournamentUseCase)
    jest.spyOn(loadByTournamentUseCase, 'loadByTournamentId').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await controller.handle(requestLoadByTournamentIdTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(loadByTournamentUseCase, 'loadByTournamentId').mockResolvedValueOnce([tournamentSponsorMock])

    const controller = new LoadByTournamentIdTournamentSponsorController(validation, loadByTournamentUseCase)
    const httpResponse = await controller.handle(requestLoadByTournamentIdTournamentSponsorControllerMock)
    expect(httpResponse).toEqual(ok([tournamentSponsorMock]))
  })
})
