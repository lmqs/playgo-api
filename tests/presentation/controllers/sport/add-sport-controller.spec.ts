import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { mockAddSportStub } from '@/tests/presentation/mocks/mock-sport'
import { mockValidationStub } from '@/tests/presentation/mocks/mock-validation'
import { AddSportController } from '@/presentation/controllers/sport/add-sport-controller'
import { AddSport } from '.'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { Validation } from '@/presentation/protocols'

const mockRequest = (): AddSportController.Request => ({
  description: 'any_description'
})

type SutTypes = {
  sut: AddSportController
  validationStub: Validation
  addSportStub: AddSport
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const addSportStub = mockAddSportStub()
  const sut = new AddSportController(validationStub, addSportStub)
  return {
    sut,
    validationStub,
    addSportStub
  }
}

describe('Sport Controller', () => {
  test('Should call validation.validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const addSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith(mockRequest())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call AddSport with correct values', async () => {
    const { sut, addSportStub } = makeSut()
    const addSpy = jest.spyOn(addSportStub, 'add')

    await sut.handle(mockRequest())
    expect(addSpy).toHaveBeenCalledWith({
      description: 'any_description'
    })
  })

  test('Should return 500 if AddSport throws', async () => {
    const { sut, addSportStub } = makeSut()
    jest.spyOn(addSportStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if addSport returns null', async () => {
    const { sut, addSportStub } = makeSut()
    jest.spyOn(addSportStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { resolve(undefined) }))
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('description')))
  })

  test('Should return 200 if valid data is provider', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      id: 'any_id',
      description: 'any_description',
      deleted: false
    }))
  })
})