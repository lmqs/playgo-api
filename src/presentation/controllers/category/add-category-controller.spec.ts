import { MissingParamError, ParamInUseError, ServerError } from '../../errors'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helper'
import { AddCategoryController } from './add-category-controller'
import { HttpRequest, Validation, AddCategory, AddCategoryModel, CategoryModel } from './add-category-controller-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}
const makeFakerRequest = (): HttpRequest => ({
  body: {
    description: 'valid_user',
    tournamentId: 'valid_password',
    numberAthletes: 'valid_numberAthletes'
  }
})

const makeFakerCategoryModel = (): CategoryModel => ({
  id: 'valid_id',
  description: 'valid_user',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})

interface SutTypes {
  sut: AddCategoryController
  validationStub: Validation
  addCategoryStub: AddCategory
}

const makeAddCategory = (): AddCategory => {
  class AddAccountStub implements AddCategory {
    async add (account: AddCategoryModel): Promise<CategoryModel> {
      return await new Promise(resolve => { resolve(makeFakerCategoryModel()) })
    }
  }
  return new AddAccountStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addCategoryStub = makeAddCategory()
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
    expect(addSpy).toHaveBeenCalledWith(makeFakerRequest().body)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_filed'))
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
    expect(httpResponse).toEqual(serverError(new ServerError()))
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
