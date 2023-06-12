import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadCategoriesByTournamentIdController } from '@/presentation/controllers/category/load-category-by-tournamentId-controller'
import { RequiredFieldValidation, ValidationComposite } from '@/presentation/validation/validators'
import { CategoryPostgresRepository } from '@/infra/database/postgres/category/category-repository'
import { ICategoryRepository } from '@/data/protocols/db'
import { Validation } from '@/presentation/protocols'
import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournamentId'
import { DbLoadCategoriesUseCase } from '@/data/usescases/category'
import { categoryModelMock, requestCategoryLoadByTournamentMock } from './category-mock'
jest.mock('@/infra/database/postgres/category/category-repository')

describe('LoadCategoriesByTournamentId Controller', () => {
  let categoryRepo: ICategoryRepository
  let loadCatByTournamentIdUseCase: ILoadCategoriesByTournamentId
  let loadValidation: Validation

  beforeEach(() => {
    categoryRepo = new CategoryPostgresRepository()
    const validations: Validation[] = []

    loadValidation = new ValidationComposite(validations)
    loadCatByTournamentIdUseCase = new DbLoadCategoriesUseCase(categoryRepo)
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.resetModules()
  })

  test('Should call validation.validate with correct values', async () => {
    const controller = new LoadCategoriesByTournamentIdController(loadValidation, loadCatByTournamentIdUseCase)
    const addSpy = jest.spyOn(loadValidation, 'validate')

    await controller.handle(requestCategoryLoadByTournamentMock)
    expect(addSpy).toHaveBeenCalledWith({ tournamentId: 'valid_tournamentId' })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const validationsError: Validation[] = []
    validationsError.push(new RequiredFieldValidation('id'))
    const loadErrorValidation = new ValidationComposite(validationsError)

    const controller = new LoadCategoriesByTournamentIdController(loadErrorValidation, loadCatByTournamentIdUseCase)
    jest.spyOn(loadValidation, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('id')))
    const httpResponse = await controller.handle(requestCategoryLoadByTournamentMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('id')))
  })

  test('Should call loadCategoriesByTournamentId with correct values', async () => {
    const controller = new LoadCategoriesByTournamentIdController(loadValidation, loadCatByTournamentIdUseCase)
    const loadSpy = jest.spyOn(loadCatByTournamentIdUseCase, 'load')
    await controller.handle(requestCategoryLoadByTournamentMock)
    expect(loadSpy).toHaveBeenCalledWith('valid_tournamentId')
  })

  test('Should return 500 if loadCategoriesByTournamentId throws', async () => {
    const controller = new LoadCategoriesByTournamentIdController(loadValidation, loadCatByTournamentIdUseCase)
    jest.spyOn(loadCatByTournamentIdUseCase, 'load').mockImplementationOnce(() => {
      throw new Error('fake error')
    })

    const httpResponse = await controller.handle(requestCategoryLoadByTournamentMock)
    expect(httpResponse).toEqual(serverError(new Error('fake error')))
  })

  test('Should return 204 if loadCategoriesByTournamentId returns empty', async () => {
    const controller = new LoadCategoriesByTournamentIdController(loadValidation, loadCatByTournamentIdUseCase)
    jest.spyOn(loadCatByTournamentIdUseCase, 'load').mockReturnValueOnce(Promise.resolve([]))

    const httpResponse = await controller.handle(requestCategoryLoadByTournamentMock)
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if valid data is provider', async () => {
    jest.spyOn(loadCatByTournamentIdUseCase, 'load').mockReturnValueOnce(Promise.resolve([categoryModelMock, categoryModelMock]))

    const controller = new LoadCategoriesByTournamentIdController(loadValidation, loadCatByTournamentIdUseCase)
    const httpResponse = await controller.handle(requestCategoryLoadByTournamentMock)
    expect(httpResponse).toEqual(ok([categoryModelMock, categoryModelMock]))
  })
})
