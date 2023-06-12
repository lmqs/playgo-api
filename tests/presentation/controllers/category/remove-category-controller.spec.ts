import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, noContent } from '@/presentation/helpers/http/http-helper'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { ICategoryRepository } from '@/data/protocols/db'
import { Validation } from '@/presentation/protocols'
import { RemoveCategoryUseCase } from '@/data/usescases/category'
import { IRemoveCategory } from '@/domain/usecases/category/remove-category'
import { RemoveCategoryController } from '@/presentation/controllers/category'
import { requestRemoveCategoryMock } from './category-mock'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('RemoveCategoryController Controller', () => {
  let categoryRepo: ICategoryRepository
  let removeCategoryUseCase: IRemoveCategory
  let removeValidation: Validation

  beforeEach(() => {
    categoryRepo = new CategoryPostgresRepository()
    const validations: Validation[] = []

    removeValidation = new ValidationComposite(validations)
    removeCategoryUseCase = new RemoveCategoryUseCase(categoryRepo)
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('Should call validation.validate with correct values', async () => {
    const controller = new RemoveCategoryController(removeValidation, removeCategoryUseCase)
    const validationSpy = jest.spyOn(removeValidation, 'validate')

    await controller.handle(requestRemoveCategoryMock)
    expect(validationSpy).toHaveBeenCalledWith({ id: 'valid_id' })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const validationsError: Validation[] = []
    validationsError.push(new RequiredFieldValidation('id'))
    const loadErrorValidation = new ValidationComposite(validationsError)
    jest.spyOn(loadErrorValidation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('id')))

    const controller = new RemoveCategoryController(loadErrorValidation, removeCategoryUseCase)
    const httpResponse = await controller.handle(requestRemoveCategoryMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should call remove with correct values', async () => {
    const controller = new RemoveCategoryController(removeValidation, removeCategoryUseCase)
    const loadSpy = jest.spyOn(removeCategoryUseCase, 'remove')
    await controller.handle(requestRemoveCategoryMock)
    expect(loadSpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return 500 if remove throws', async () => {
    const controller = new RemoveCategoryController(removeValidation, removeCategoryUseCase)
    jest.spyOn(removeCategoryUseCase, 'remove').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const httpResponse = await controller.handle(requestRemoveCategoryMock)
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 204 if success delete', async () => {
    const controller = new RemoveCategoryController(removeValidation, removeCategoryUseCase)
    jest.spyOn(removeCategoryUseCase, 'remove')

    const httpResponse = await controller.handle(requestRemoveCategoryMock)
    expect(httpResponse).toEqual(noContent())
  })
})
