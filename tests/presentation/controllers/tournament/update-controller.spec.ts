import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { UpdateTournamentController } from '@/presentation/controllers/tournament'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { makeDbUpdateTournament } from '@/main/factories/usecases/tournament/db-update-tournament'
import { IUpdateTournament } from '@/domain/usecases/tournament/update-tournament'
import { requestUpdateMock, tournamentModelMock } from './update-controller-mock'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'

describe('UpdateTournamentController Controller', () => {
  let validationStub: Validation
  let useCaseStub: IUpdateTournament
  beforeEach(() => {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validationStub = new ValidationComposite(validations)
    useCaseStub = makeDbUpdateTournament()
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'update').mockResolvedValueOnce(tournamentModelMock)

    const controller = new UpdateTournamentController(validationStub, useCaseStub)
    const httpResponse = await controller.handle(requestUpdateMock)
    expect(httpResponse).toEqual(ok(tournamentModelMock))
    expect(useCaseStub.update).toHaveBeenCalledWith(requestUpdateMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const controller = new UpdateTournamentController(validationStub, useCaseStub)

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))

    const httpResponse = await controller.handle(requestUpdateMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
    expect(validationStub.validate).toHaveBeenCalledWith(requestUpdateMock)
  })

  test('Should return 500 if update throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'update').mockImplementationOnce(() => {
      throw new Error()
    })
    const controller = new UpdateTournamentController(validationStub, useCaseStub)

    const httpResponse = await controller.handle(requestUpdateMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 403 if AddTournament returns ParamInUseError', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'update').mockImplementationOnce(() => {
      throw new ParamInUseError('any')
    })

    const controller = new UpdateTournamentController(validationStub, useCaseStub)
    const httpResponse = await controller.handle(requestUpdateMock)
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('any')))
  })
})
