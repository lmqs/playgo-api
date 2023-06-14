import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { AddCategoryController } from '@/presentation/controllers/category/add-category-controller'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { Validation } from '@/presentation/protocols'
import { IAddCategory } from '@/domain/usecases/category/add-category'
import { AddCategoryUseCase } from '@/data/usescases/category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { ICategoryRepository } from '@/data/protocols/db'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { categoryModelMock, requestCategoryMock } from './category-mock'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('AddCategory Controller', () => {
  let categoryRepo: ICategoryRepository
  let addCategoryUseCase: IAddCategory
  let addCategoryValidation: Validation

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('description'))
    validations.push(new RequiredFieldValidation('tournamentId'))

    addCategoryValidation = new ValidationComposite(validations)
    addCategoryUseCase = new AddCategoryUseCase(categoryRepo, categoryRepo)
  })

  test('Should call validation.validate with correct values', async () => {
    const addCategoryController = new AddCategoryController(addCategoryValidation, addCategoryUseCase)
    const validationStub = jest.spyOn(addCategoryValidation, 'validate')

    await addCategoryController.handle(requestCategoryMock)
    expect(validationStub).toHaveBeenCalledWith(requestCategoryMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const addCategoryController = new AddCategoryController(addCategoryValidation, addCategoryUseCase)

    jest.spyOn(addCategoryValidation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await addCategoryController.handle(requestCategoryMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call AddAccount with correct values', async () => {
    const addCategoryController = new AddCategoryController(addCategoryValidation, addCategoryUseCase)
    const addSpy = jest.spyOn(addCategoryUseCase, 'add')

    await addCategoryController.handle(requestCategoryMock)
    expect(addSpy).toHaveBeenCalledWith({
      description: 'valid_user',
      tournamentId: 'valid_password',
      numberAthletes: 'valid_numberAthletes'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const addCategoryController = new AddCategoryController(addCategoryValidation, addCategoryUseCase)
    jest.spyOn(addCategoryUseCase, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await addCategoryController.handle(requestCategoryMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if addCategory returns null', async () => {
    const addCategoryController = new AddCategoryController(addCategoryValidation, addCategoryUseCase)
    jest.spyOn(addCategoryUseCase, 'add').mockImplementationOnce(() => {
      throw new ParamInUseError('description')
    })
    const httpResponse = await addCategoryController.handle(requestCategoryMock)
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('description')))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(addCategoryUseCase, 'add').mockResolvedValueOnce(categoryModelMock)

    const addCategoryController = new AddCategoryController(addCategoryValidation, addCategoryUseCase)
    const httpResponse = await addCategoryController.handle(requestCategoryMock)
    expect(httpResponse).toEqual(
      ok({
        id: 'valid_id',
        description: 'valid_description',
        tournamentId: 'valid_tournamentId',
        numberAthletes: 'valid_numberAthletes'
      })
    )
  })
})
