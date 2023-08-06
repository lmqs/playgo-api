import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { Validation } from '@/presentation/protocols'
import { SportPostgresRepository } from '@/infra/database/postgres/sport/sport-repository'
import { AddSport } from '@/domain/usecases/sport'
import { AddSportController } from '@/presentation/controllers/sport'
import { DbAddSport } from '@/data/usescases/sport/db-add-sport'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { requestAddMock, sportMock } from './sport-mock'
import { ISportRepository } from '@/data/protocols/db'

describe('Add Sport Controller', () => {
  let addSportUseCaseStub: AddSport
  let sportRepositoryStub: ISportRepository
  let validationStub: Validation

  beforeEach(() => {
    sportRepositoryStub = new SportPostgresRepository()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('description'))

    validationStub = new ValidationComposite(validations)
    addSportUseCaseStub = new DbAddSport(sportRepositoryStub)
  })

  test('Should return 400 if Validation returns an error', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(new MissingParamError('any_filed'))
    const controller = new AddSportController(validationStub, addSportUseCaseStub)

    const httpResponse = await controller.handle(requestAddMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
    expect(validationStub.validate).toHaveBeenCalledWith(requestAddMock)
  })

  test('Should return 403 if addSport returns null', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(addSportUseCaseStub, 'add').mockResolvedValueOnce(undefined)

    const controller = new AddSportController(validationStub, addSportUseCaseStub)

    const httpResponse = await controller.handle(requestAddMock)
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('description')))
  })

  test('Should return 500 if AddSport throws', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(addSportUseCaseStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const controller = new AddSportController(validationStub, addSportUseCaseStub)
    const httpResponse = await controller.handle(requestAddMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(validationStub, 'validate').mockResolvedValueOnce(undefined)
    jest.spyOn(addSportUseCaseStub, 'add').mockResolvedValueOnce(sportMock)

    const controller = new AddSportController(validationStub, addSportUseCaseStub)
    const httpResponse = await controller.handle(requestAddMock)
    expect(httpResponse).toEqual(ok(sportMock))
  })
})
