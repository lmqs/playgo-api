import { MissingParamError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, ok, noContent } from '@/presentation/helpers/http/http-helper'
import { LoadCategoriesByTournamentIdController } from '@/presentation/controllers/category/load-category-by-tournamentId/load-category-by-tournamentId-controller'
import { HttpRequest, Validation, CategoryModel, LoadCategoriesByTournamentId } from '@/presentation/controllers/category/load-category-by-tournamentId/load-category-by-tournamentId-controller-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}
const makeFakerRequest = (): HttpRequest => ({
  query: {
    tournamentId: 'valid_tournamentId'
  }
})

const makeFakerCategoriesModel = (): CategoryModel => ({
  id: 'valid_id',
  description: 'valid_user',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})

type SutTypes = {
  sut: LoadCategoriesByTournamentIdController
  validationStub: Validation
  loadCategoriesByTournamentIdStub: LoadCategoriesByTournamentId
}

const makeLoadCategoriesByTournamentIdStub = (): LoadCategoriesByTournamentId => {
  class LoadCategoriesByTournamentIdStub implements LoadCategoriesByTournamentId {
    async load (tournamentId: string): Promise<CategoryModel[]> {
      return await new Promise(resolve => { resolve([makeFakerCategoriesModel(), makeFakerCategoriesModel()]) })
    }
  }
  return new LoadCategoriesByTournamentIdStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const loadCategoriesByTournamentIdStub = makeLoadCategoriesByTournamentIdStub()
  const sut = new LoadCategoriesByTournamentIdController(validationStub, loadCategoriesByTournamentIdStub)
  return {
    sut,
    validationStub,
    loadCategoriesByTournamentIdStub
  }
}

describe('LoadCategoriesByTournamentId Controller', () => {
  test('Should call validation.validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const addSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeFakerRequest())
    expect(addSpy).toHaveBeenCalledWith({ tournamentId: 'valid_tournamentId' })
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_filed'))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call loadCategoriesByTournamentId with correct values', async () => {
    const { sut, loadCategoriesByTournamentIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadCategoriesByTournamentIdStub, 'load')
    await sut.handle(makeFakerRequest())
    expect(loadSpy).toHaveBeenCalledWith('valid_tournamentId')
  })

  test('Should return 500 if loadCategoriesByTournamentId throws', async () => {
    const { sut, loadCategoriesByTournamentIdStub } = makeSut()
    jest.spyOn(loadCategoriesByTournamentIdStub, 'load').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 204 if loadCategoriesByTournamentId returns empty', async () => {
    const { sut, loadCategoriesByTournamentIdStub } = makeSut()
    jest.spyOn(loadCategoriesByTournamentIdStub, 'load').mockReturnValueOnce(new Promise(resolve => { resolve([]) }))

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 if valid data is provider', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(ok([makeFakerCategoriesModel(), makeFakerCategoriesModel()]))
  })
})
