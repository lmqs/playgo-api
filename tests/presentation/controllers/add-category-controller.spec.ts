import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { AddCategoryController } from '@/presentation/controllers/category/add-category-controller'
import { Validation, AddCategory } from '@/presentation/controllers/category'
import { mockAddCategoryStub } from '@/tests/presentation/mocks/mock-account'
import { mockValidationStub } from '@/tests/presentation/mocks/mock-validation'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'

const makeFakerRequest = (): AddCategoryController.Request => ({
  description: 'valid_user',
  tournamentId: 'valid_password',
  numberAthletes: 'valid_numberAthletes'
})

type SutTypes = {
  sut: AddCategoryController
  validationStub: Validation
  addCategoryStub: AddCategory
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const addCategoryStub = mockAddCategoryStub()
  const sut = new AddCategoryController(validationStub, addCategoryStub)
  return {
    sut,
    validationStub,
    addCategoryStub
  }
}

describe('Category Controller', () => {
  test('Should call validation.validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const addSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeFakerRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakerRequest())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addCategoryStub } = makeSut()
    const addSpy = jest.spyOn(addCategoryStub, 'add')

    await sut.handle(makeFakerRequest())
    expect(addSpy).toHaveBeenCalledWith({
      description: 'valid_user',
      tournamentId: 'valid_password',
      numberAthletes: 'valid_numberAthletes'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addCategoryStub } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if addCategory returns null', async () => {
    const { sut, addCategoryStub } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { resolve(undefined) }))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('description')))
  })

  test('Should return 200 if valid data is provider', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(ok({
      id: 'valid_id',
      description: 'valid_user',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes'
    }))
  })
})
