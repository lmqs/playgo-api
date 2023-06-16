import { MissingParamError } from '@/presentation/errors'
import { badRequest, serverError, ok, forbidden } from '@/presentation/helpers/http/http-helper'
import { mockValidationStub } from '../../mocks/mock-validation'
import { mockAddTournament } from '../../mocks/mock-tournament'
import { AddTournamentController } from '@/presentation/controllers/tournament'
import { Validation } from '@/presentation/protocols'
import { AddTournament } from '@/domain/usecases/tournament'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { requestAddTournamentControllerMock, tournamentObjectDefaultMock } from './tournament-mock'
import { errorsConstant } from '@/data/constants/errors'

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
  test('Should call AddTournament with correct values', async () => {
    const { sut, addTournamentStub } = makeSut()
    const addTournamentSpy = jest.spyOn(addTournamentStub, 'add')

    await sut.handle(requestAddTournamentControllerMock)
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

  test('Should return 200 if valid data is provider', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(requestAddTournamentControllerMock)
    expect(httpResponse).toEqual(ok(tournamentObjectDefaultMock))
  })

  test('Should call validation.validate with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const addSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle(requestAddTournamentControllerMock)
    expect(addSpy).toHaveBeenCalledWith(requestAddTournamentControllerMock)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(Promise.resolve(new MissingParamError('any_filed')))
    const httpResponse = await sut.handle(requestAddTournamentControllerMock)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_filed')))
  })

  test('Should return 500 if AddTournament throws', async () => {
    const { sut, addTournamentStub } = makeSut()
    const fakeError = new Error('fake error')
    jest.spyOn(addTournamentStub, 'add').mockImplementationOnce(() => {
      throw fakeError
    })

    const httpResponse = await sut.handle(requestAddTournamentControllerMock)
    expect(httpResponse).toEqual(serverError(fakeError))
  })

  test('Should return 403 if AddTournament returns ParamInUseError', async () => {
    const { sut, addTournamentStub } = makeSut()
    jest.spyOn(addTournamentStub, 'add').mockImplementationOnce(() => {
      throw new ParamInUseError(errorsConstant.description)
    }
    )
    const httpResponse = await sut.handle(requestAddTournamentControllerMock)
    expect(httpResponse).toEqual(forbidden(new ParamInUseError(errorsConstant.description)))
  })
})
