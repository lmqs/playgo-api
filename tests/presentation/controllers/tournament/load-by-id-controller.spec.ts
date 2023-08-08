import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { LoadTournamentById } from '@/domain/usecases/tournament'
import { requestMock, tournamentModelMock } from './load-by-id-controller-mock'
import { LoadTournamentByIdController } from '@/presentation/controllers/tournament'
import { makeDbLoadTournamentById } from '@/main/factories/usecases/tournament'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'

describe('LoadTournamentByIdController Controller', () => {
  let validationStub: Validation
  let useCaseStub: LoadTournamentById
  beforeEach(() => {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validationStub = new ValidationComposite(validations)
    useCaseStub = makeDbLoadTournamentById()
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'load').mockResolvedValueOnce(tournamentModelMock)

    const controller = new LoadTournamentByIdController(validationStub, useCaseStub)
    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(ok(tournamentModelMock))
    expect(useCaseStub.load).toHaveBeenCalledWith(requestMock.id)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const controller = new LoadTournamentByIdController(validationStub, useCaseStub)

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))

    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
    expect(validationStub.validate).toHaveBeenCalledWith(requestMock)
  })

  test('Should return 500 if load throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })
    const controller = new LoadTournamentByIdController(validationStub, useCaseStub)

    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
