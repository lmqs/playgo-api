import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols'
import { RemoveTournament } from '@/domain/usecases/tournament'

import { RemoveTournamentController } from '@/presentation/controllers/tournament'
import { makeDbRemoveTournament } from '@/main/factories/usecases/tournament'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { requestMock } from './load-by-id-controller-mock'

describe('RemoveTournamentController Controller', () => {
  let validationStub: Validation
  let useCaseStub: RemoveTournament
  beforeEach(() => {
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('id'))
    validationStub = new ValidationComposite(validations)
    useCaseStub = makeDbRemoveTournament()
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'remove').mockResolvedValueOnce(undefined)

    const controller = new RemoveTournamentController(validationStub, useCaseStub)
    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(noContent())
    expect(useCaseStub.remove).toHaveBeenCalledWith(requestMock.id)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const controller = new RemoveTournamentController(validationStub, useCaseStub)

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))

    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
    expect(validationStub.validate).toHaveBeenCalledWith(requestMock)
  })

  test('Should return 500 if remove throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(useCaseStub, 'remove').mockImplementationOnce(() => {
      throw new Error()
    })
    const controller = new RemoveTournamentController(validationStub, useCaseStub)

    const httpResponse = await controller.handle(requestMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
