import { DbAddTournament } from './db-add-tournament'
import { AddTournamentRepository, AddTournamentParams, TournamentModel, LoadTournamentByDescriptionRepository } from './db-add-tournament-protocols'

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
    deleted: true
  }
}

const makeFakeAddTournamentModel = (): AddTournamentParams => {
  return {
    description: 'valid_description',
    cityId: 'valid_city',
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationLimit: 'valid_registrationLimit',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  }
}

type SutTypes = {
  sut: DbAddTournament
  loadTournamentByDescriptionRepositoryStub: LoadTournamentByDescriptionRepository
  addTournamentRepositoryStub: AddTournamentRepository
}

const makeAddTournamentRepositoryStub = (): AddTournamentRepository => {
  class AddTournamentRepositoryStub implements AddTournamentRepository {
    async add (data: AddTournamentParams): Promise<TournamentModel> {
      return makeFakeTournamentModel()
    }
  }
  return new AddTournamentRepositoryStub()
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
  const addTournamentRepositoryStub = makeAddTournamentRepositoryStub()
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

    await sut.add(makeFakeAddTournamentModel())
    expect(loadTournamentByIdRepositorySpy).toHaveBeenCalledWith('valid_description')
  })

  test('Should throw if LoadTournamentByDescriptionRepository throws', async () => {
    const { sut, loadTournamentByDescriptionRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByDescriptionRepositoryStub, 'loadByDescription').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(makeFakeAddTournamentModel())
    await expect(promise).rejects.toThrow()
  })

  test('Should return undefined if LoadTournamentByDescriptionRepository not return empty', async () => {
    const { sut, loadTournamentByDescriptionRepositoryStub, addTournamentRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByDescriptionRepositoryStub, 'loadByDescription').mockReturnValueOnce(new Promise(resolve => { resolve(makeFakeTournamentModel()) }))
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    const tournament = await sut.add(makeFakeAddTournamentModel())
    expect(tournament).toBeUndefined()
    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should call AddTournamentRepository with correct values ', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    await sut.add(makeFakeAddTournamentModel())
    expect(addTournamentRepositorySpy).toHaveBeenCalledWith(makeFakeAddTournamentModel())
  })

  test('Should throw if AddTournamentRepository throws', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()
    jest.spyOn(addTournamentRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.add(makeFakeAddTournamentModel())
    await expect(promise).rejects.toThrow()
  })
})
