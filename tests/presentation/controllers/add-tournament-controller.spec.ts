import { MissingParamError, ParamInUseError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { AddTournamentController } from '@/presentation/controllers/tournament/add-tournament/add-tournament-controller'
import { Validation, TournamentModel, AddTournament } from '@/presentation/controllers/tournament/add-tournament/add-tournament-controller-protocols'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null as unknown as Error
    }
  }
  return new ValidationStub()
}
const makeFakerRequest = (): AddTournamentController.Request => ({
  description: 'valid_description',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtTournament: 'valid_dtTournament',
  registrationLimit: 'valid_registrationLimit',
  registrationStartDate: 'valid_registrationStartDate',
  registrationFinalDate: 'valid_registrationFinalDate'
})

const makeFakeTournamentModel = (): TournamentModel => {
  return {
    id: 'valid_id',
    description: 'valid_description',
    cityId: 'valid_city',
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationLimit: 'valid_registrationLimit',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: false
  }
}

type SutTypes = {
  sut: AddTournamentController
  validationStub: Validation
  addTournamentStub: AddTournament
}

const makeAddTournament = (): AddTournament => {
  class AddTournamentStub implements AddTournament {
    async add (data: AddTournament.Params): Promise<AddTournament.Result> {
      return await new Promise(resolve => { resolve(makeFakeTournamentModel()) })
    }
  }
  return new AddTournamentStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addTournamentStub = makeAddTournament()
  const sut = new AddTournamentController(validationStub, addTournamentStub)
  return {
    sut,
    validationStub,
    addTournamentStub
  }
}

describe('AddTournamentController Controller', () => {
  test('Should call validation.validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const addSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(makeFakerRequest())
    expect(addSpy).toHaveBeenCalledWith(makeFakerRequest())
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_filed'))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should call AddTournament with correct values', async () => {
    const { sut, addTournamentStub } = makeSut()
    const addTournamentSpy = jest.spyOn(addTournamentStub, 'add')

    await sut.handle(makeFakerRequest())
    expect(addTournamentSpy).toHaveBeenCalledWith({
      description: 'valid_description',
      cityId: 'valid_city',
      sportId: 'valid_sportId',
      dtTournament: 'valid_dtTournament',
      registrationLimit: 'valid_registrationLimit',
      registrationStartDate: 'valid_registrationStartDate',
      registrationFinalDate: 'valid_registrationFinalDate'
    })
  })

  test('Should return 500 if AddTournament throws', async () => {
    const { sut, addTournamentStub } = makeSut()
    jest.spyOn(addTournamentStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Should return 200 if valid data is provider', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(ok({
      id: 'valid_id',
      description: 'valid_description',
      cityId: 'valid_city',
      sportId: 'valid_sportId',
      dtTournament: 'valid_dtTournament',
      registrationLimit: 'valid_registrationLimit',
      registrationStartDate: 'valid_registrationStartDate',
      registrationFinalDate: 'valid_registrationFinalDate',
      deleted: false
    }))
  })

  test('Should return 403 if AddTournament returns null', async () => {
    const { sut, addTournamentStub } = makeSut()
    jest.spyOn(addTournamentStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { resolve(undefined) }))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('description')))
  })
})
