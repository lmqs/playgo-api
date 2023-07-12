import { mockAddTournamentParams, mockTournamentModel } from '@/tests/domain/mocks'
import { mockAddTournamentRepository } from '../../mocks'
import { DbAddTournament } from '@/data/usescases/tournament/db-add-tournament'
import { LoadTournamentByDescriptionRepository, AddTournamentRepository } from '@/data/protocols/db/tournament'
import { errorsConstant } from '@/data/constants/errors'
import { ParamInUseError } from '@/domain/errors/param-in-use-error'
import { addTournamentObjectMock } from './tournament-mock'
import { InvalidDateError } from '@/data/errors/invalid-date-error'

type SutTypes = {
  sut: DbAddTournament
  loadTournamentByDescriptionRepositoryStub: LoadTournamentByDescriptionRepository
  addTournamentRepositoryStub: AddTournamentRepository
}

const makeLoadTournamentByDescriptionRepositoryStub = (): LoadTournamentByDescriptionRepository => {
  class LoadTournamentByDescriptionRepositoryStub implements LoadTournamentByDescriptionRepository {
    async loadByDescription (id: string): Promise<LoadTournamentByDescriptionRepository.Result | undefined> {
      return undefined
    }
  }
  return new LoadTournamentByDescriptionRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadTournamentByDescriptionRepositoryStub = makeLoadTournamentByDescriptionRepositoryStub()
  const addTournamentRepositoryStub = mockAddTournamentRepository()
  const sut = new DbAddTournament(loadTournamentByDescriptionRepositoryStub, addTournamentRepositoryStub)
  return {
    sut,
    loadTournamentByDescriptionRepositoryStub,
    addTournamentRepositoryStub
  }
}

describe('DbAddTournament UseCase', () => {
  test('Should call LoadTournamentByDescriptionRepository with correct values', async () => {
    const { sut, loadTournamentByDescriptionRepositoryStub } = makeSut()
    const loadTournamentByIdRepositorySpy = jest.spyOn(loadTournamentByDescriptionRepositoryStub, 'loadByDescription')

    await sut.add(mockAddTournamentParams())
    expect(loadTournamentByIdRepositorySpy).toHaveBeenCalledWith('valid_description')
  })

  test('Should call AddTournamentRepository with correct values ', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    await sut.add(mockAddTournamentParams())
    expect(addTournamentRepositorySpy).toHaveBeenCalledWith(mockAddTournamentParams())
  })

  test('Should throw if LoadTournamentByDescriptionRepository throws', async () => {
    const { sut, loadTournamentByDescriptionRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByDescriptionRepositoryStub, 'loadByDescription').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(mockAddTournamentParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return InvalidDateError if validRegistrationDate is invalid', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()

    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    const promise = sut.add({
      ...addTournamentObjectMock,
      dtFinalRegistration: '01/06/2023',
      dtStartRegistration: '02/06/2023'
    })
    await expect(promise).rejects.toThrow(new InvalidDateError(errorsConstant.invalidRegistrationDate))

    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should return InvalidDateError if validTournamentDate is invalid', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    const promise = sut.add({
      ...addTournamentObjectMock,
      dtFinalTournament: '01/06/2023',
      dtStartTournament: '02/06/2023'
    })

    await expect(promise).rejects.toThrow(new InvalidDateError(errorsConstant.invalidTournamentDate))
    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should return ParamInUseError if LoadTournamentByDescriptionRepository not return empty', async () => {
    const { sut, loadTournamentByDescriptionRepositoryStub, addTournamentRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByDescriptionRepositoryStub, 'loadByDescription').mockReturnValueOnce(
      new Promise(resolve => { resolve(mockTournamentModel()) })
    )
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    const promise = sut.add(mockAddTournamentParams())
    await expect(promise).rejects.toThrow(new ParamInUseError(errorsConstant.description))

    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should throw if AddTournamentRepository throws', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()

    const fakeError = new Error('fake error')
    jest.spyOn(addTournamentRepositoryStub, 'add').mockImplementationOnce(() => {
      throw fakeError
    })

    const promise = sut.add(mockAddTournamentParams())
    await expect(promise).rejects.toThrow()
  })
})
