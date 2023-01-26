import { mockAddTournamentParams, mockTournamentModel } from '../../../../domain/test/mock-tournament'
import { mockAddTournamentRepository } from '../../../test'
import { DbAddTournament } from './db-add-tournament'
import { AddTournamentRepository, TournamentModel, LoadTournamentByDescriptionRepository } from './db-add-tournament-protocols'

type SutTypes = {
  sut: DbAddTournament
  loadTournamentByDescriptionRepositoryStub: LoadTournamentByDescriptionRepository
  addTournamentRepositoryStub: AddTournamentRepository
}

const makeLoadTournamentByDescriptionRepositoryStub = (): LoadTournamentByDescriptionRepository => {
  class LoadTournamentByDescriptionRepositoryStub implements LoadTournamentByDescriptionRepository {
    async loadByDescription (id: string): Promise<TournamentModel | undefined> {
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

  test('Should throw if LoadTournamentByDescriptionRepository throws', async () => {
    const { sut, loadTournamentByDescriptionRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByDescriptionRepositoryStub, 'loadByDescription').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(mockAddTournamentParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return undefined if LoadTournamentByDescriptionRepository not return empty', async () => {
    const { sut, loadTournamentByDescriptionRepositoryStub, addTournamentRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByDescriptionRepositoryStub, 'loadByDescription').mockReturnValueOnce(new Promise(resolve => { resolve(mockTournamentModel()) }))
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    const tournament = await sut.add(mockAddTournamentParams())
    expect(tournament).toBeUndefined()
    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should call AddTournamentRepository with correct values ', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    await sut.add(mockAddTournamentParams())
    expect(addTournamentRepositorySpy).toHaveBeenCalledWith(mockAddTournamentParams())
  })

  test('Should throw if AddTournamentRepository throws', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()
    jest.spyOn(addTournamentRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(mockAddTournamentParams())
    await expect(promise).rejects.toThrow()
  })
})
