import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { AddTournamentController } from '@/presentation/controllers/tournament'
import { Validation } from '@/presentation/protocols'
import { AddTournament } from '@/domain/usecases/tournament'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { errorsConstant } from '@/data/constants/errors'
import { makeDbAddTournament } from '@/main/factories/usecases/tournament'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { requestAddTournamentControllerMock, tournamentObjectDefaultMock } from './add-tournament-controller-mock'

describe('AddTournamentController Controller', () => {
  let validationStub: Validation
  let useCaseStub: AddTournament
  beforeEach(() => {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validationStub = new ValidationComposite(validations)
    useCaseStub = makeDbAddTournament()
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'add').mockResolvedValueOnce(tournamentObjectDefaultMock)
    const controller = new AddTournamentController(validationStub, useCaseStub)
    const httpResponse = await controller.handle(requestAddTournamentControllerMock)
    expect(httpResponse).toEqual(ok(tournamentObjectDefaultMock))
  })

  test('Should return 400 if Validation returns an error', async () => {
    jest.spyOn(useCaseStub, 'add')
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const controller = new AddTournamentController(validationStub, useCaseStub)
    const httpResponse = await controller.handle(requestAddTournamentControllerMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
    expect(validationStub.validate).toHaveBeenCalledWith(requestAddTournamentControllerMock)
    expect(useCaseStub.add).toHaveBeenCalledTimes(0)
  })

  test('Should return 500 if AddTournament throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    const controller = new AddTournamentController(validationStub, useCaseStub)
    const fakeError = new Error('fake error')
    jest.spyOn(useCaseStub, 'add').mockImplementation(() => {
      throw fakeError
    })

    const httpResponse = await controller.handle(requestAddTournamentControllerMock)
    expect(httpResponse).toEqual(serverError(fakeError))
  })

  test('Should return 403 if AddTournament returns ParamInUseError', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'add').mockImplementationOnce(() => {
      throw new ParamInUseError(errorsConstant.description)
    })

    const controller = new AddTournamentController(validationStub, useCaseStub)
    const httpResponse = await controller.handle(requestAddTournamentControllerMock)
    expect(httpResponse).toEqual(forbidden(new ParamInUseError(errorsConstant.description)))
  })
})
