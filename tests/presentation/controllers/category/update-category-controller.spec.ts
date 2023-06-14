import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { UpdateCategoryController } from '@/presentation/controllers/category/update-category-controller'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { Validation } from '@/presentation/protocols'
import { IUpdateCategory } from '@/domain/usecases/category/update-category'
import { UpdateCategoryUseCase } from '@/data/usescases/category'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { ICategoryRepository } from '@/data/protocols/db'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { categoryModelMock, requestUpdateCategoryMock } from './category-mock'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('UpdateCategory Controller', () => {
  let categoryRepo: ICategoryRepository
  let updateCategoryUseCase: IUpdateCategory
  let updateCategoryValidation: Validation

  beforeEach(async () => {
    categoryRepo = new CategoryPostgresRepository()
    const validations: Validation[] = []
    validations.push(new RequiredFieldValidation('description'))
    validations.push(new RequiredFieldValidation('id'))

    updateCategoryValidation = new ValidationComposite(validations)
    updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepo, categoryRepo)
  })

  test('Should call validation.validate with correct values', async () => {
    const updateCategoryController = new UpdateCategoryController(updateCategoryValidation, updateCategoryUseCase)
    const validationStub = jest.spyOn(updateCategoryValidation, 'validate')

    await updateCategoryController.handle(requestUpdateCategoryMock)
    expect(validationStub).toHaveBeenCalledWith(requestUpdateCategoryMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const updateCategoryController = new UpdateCategoryController(updateCategoryValidation, updateCategoryUseCase)

    jest.spyOn(updateCategoryValidation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await updateCategoryController.handle(requestUpdateCategoryMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call UpdateAccount with correct values', async () => {
    const updateCategoryController = new UpdateCategoryController(updateCategoryValidation, updateCategoryUseCase)
    const updateSpy = jest.spyOn(updateCategoryUseCase, 'update')

    await updateCategoryController.handle(requestUpdateCategoryMock)
    expect(updateSpy).toHaveBeenCalledWith({
      id: 'valid_id',
      description: 'valid_description',
      tournamentId: 'valid_tournamentId',
      numberAthletes: 'valid_numberAthletes'
    })
  })

  test('Should return 500 if UpdateAccount throws', async () => {
    const updateCategoryController = new UpdateCategoryController(updateCategoryValidation, updateCategoryUseCase)
    jest.spyOn(updateCategoryUseCase, 'update').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await updateCategoryController.handle(requestUpdateCategoryMock)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 403 if updateCategory returns null', async () => {
    const updateCategoryController = new UpdateCategoryController(updateCategoryValidation, updateCategoryUseCase)
    jest.spyOn(updateCategoryUseCase, 'update').mockImplementationOnce(() => {
      throw new ParamInUseError('description')
    })
    const httpResponse = await updateCategoryController.handle(requestUpdateCategoryMock)
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('description')))
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(updateCategoryUseCase, 'update').mockResolvedValueOnce(categoryModelMock)

    const updateCategoryController = new UpdateCategoryController(updateCategoryValidation, updateCategoryUseCase)
    const httpResponse = await updateCategoryController.handle(requestUpdateCategoryMock)
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
