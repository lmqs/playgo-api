import { MissingParamError, ParamInUseError, ServerError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { mockValidationStub } from '../mocks/mock-validation'
import { mockAddTournament } from '../mocks/mock-tournament'
import { AddTournamentController } from '@/presentation/controllers/tournament'
import { Validation } from '@/presentation/protocols'
import { AddTournament } from '@/domain/usecases/tournament'

const makeFakerRequest = (): AddTournamentController.Request => ({
  description: 'valid_description',
  organization: 'organization',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/05/2023',
  dtFinalTournament: '25/05/2023',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023',
  otherInformation: 'any_information'
})

type SutTypes = {
  sut: AddTournamentController
  validationStub: Validation
  addTournamentStub: AddTournament
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidationStub()
  const addTournamentStub = mockAddTournament()
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
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
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
      dtStartTournament: '25/05/2023',
      dtFinalTournament: '25/05/2023',
      dtStartRegistration: '25/05/2023',
      dtFinalRegistration: '25/05/2023',
      otherInformation: 'any_information',
      organization: 'organization'
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
      dtStartTournament: '25/05/2023',
      dtFinalTournament: '25/05/2023',
      dtStartRegistration: '25/05/2023',
      dtFinalRegistration: '25/05/2023',
      otherInformation: 'any_information',
      organization: 'organization',
      deleted: true
    }))
  })

  test('Should return 403 if AddTournament returns null', async () => {
    const { sut, addTournamentStub } = makeSut()
    jest.spyOn(addTournamentStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { resolve(undefined) }))
    const httpResponse = await sut.handle(makeFakerRequest())
    expect(httpResponse).toEqual(forbidden(new ParamInUseError('description')))
  })
})
