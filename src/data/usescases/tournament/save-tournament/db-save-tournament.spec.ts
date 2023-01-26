import { DbSaveTournament } from './db-save-tournament'
import { AddTournamentRepository, LoadTournamentByIdRepository, SaveTournamentModel, TournamentModel, UpdateTournamentRepository } from './db-save-tournament-protocols'

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

const makeFakeSaveTournamentModelToAdd = (): SaveTournamentModel => {
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

const makeFakeSaveTournamentModelToUpdate = (): SaveTournamentModel => Object.assign(
  {}, makeFakeSaveTournamentModelToAdd(), { id: 'valid_id' }
)

type SutTypes = {
  sut: DbSaveTournament
  loadTournamentByIdRepositoryStub: LoadTournamentByIdRepository
  addTournamentRepositoryStub: AddTournamentRepository
  updateTournamentRepositoryStub: UpdateTournamentRepository
}

const makeAddTournamentRepositoryStub = (): AddTournamentRepository => {
  class AddTournamentRepositoryStub implements AddTournamentRepository {
    async add (data: SaveTournamentModel): Promise<TournamentModel> {
      return makeFakeTournamentModel()
    }
  }
  return new AddTournamentRepositoryStub()
}

const makeUpdateTournamentRepositoryStub = (): UpdateTournamentRepository => {
  class UpdateTournamentRepositoryStub implements UpdateTournamentRepository {
    async updateTournament (data: TournamentModel): Promise<TournamentModel> {
      return makeFakeTournamentModel()
    }
  }
  return new UpdateTournamentRepositoryStub()
}

const makeLoadTournamentByIdRepositoryStub = (): LoadTournamentByIdRepository => {
  class LoadTournamentByIdRepositoryStub implements LoadTournamentByIdRepository {
    async loadById (id: string): Promise<TournamentModel | undefined> {
      return makeFakeTournamentModel()
    }
  }
  return new LoadTournamentByIdRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadTournamentByIdRepositoryStub = makeLoadTournamentByIdRepositoryStub()
  const addTournamentRepositoryStub = makeAddTournamentRepositoryStub()
  const updateTournamentRepositoryStub = makeUpdateTournamentRepositoryStub()
  const sut = new DbSaveTournament(loadTournamentByIdRepositoryStub, addTournamentRepositoryStub, updateTournamentRepositoryStub)
  return {
    sut,
    loadTournamentByIdRepositoryStub,
    addTournamentRepositoryStub,
    updateTournamentRepositoryStub
  }
}

describe('DbSaveTournament UseCase', () => {
  test('Should call LoadTournamentByIdRepository with correct values when updating record', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    const loadTournamentByIdRepositorySpy = jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById')

    await sut.save(makeFakeSaveTournamentModelToUpdate())
    expect(loadTournamentByIdRepositorySpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should not call LoadTournamentByIdRepository when data object does not provider ID', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    const loadTournamentByIdRepositorySpy = jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById')

    await sut.save(makeFakeSaveTournamentModelToAdd())
    expect(loadTournamentByIdRepositorySpy).not.toBeCalled()
  })

  test('Should throw if LoadTournamentByIdRepository throws', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.save(makeFakeSaveTournamentModelToUpdate())
    await expect(promise).rejects.toThrow()
  })

  test('Should return undefined if data.id is provider but does not exist in database', async () => {
    const { sut, loadTournamentByIdRepositoryStub, updateTournamentRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => { resolve(undefined) }))
    const updateTournamentRepositorySpy = jest.spyOn(updateTournamentRepositoryStub, 'updateTournament')

    const tournament = await sut.save(makeFakeSaveTournamentModelToUpdate())
    expect(tournament).toBeUndefined()
    expect(updateTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should call UpdateTournamentRepository with correct values when updating record', async () => {
    const { sut, updateTournamentRepositoryStub, addTournamentRepositoryStub } = makeSut()
    const updateTournamentRepositorySpy = jest.spyOn(updateTournamentRepositoryStub, 'updateTournament')
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    await sut.save(makeFakeSaveTournamentModelToUpdate())
    expect(updateTournamentRepositorySpy).toHaveBeenCalledWith(makeFakeSaveTournamentModelToUpdate())
    expect(addTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should throw if UpdateTournamentRepository throws', async () => {
    const { sut, updateTournamentRepositoryStub } = makeSut()
    jest.spyOn(updateTournamentRepositoryStub, 'updateTournament').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.save(makeFakeSaveTournamentModelToUpdate())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddTournamentRepository with correct values when add record', async () => {
    const { sut, loadTournamentByIdRepositoryStub, updateTournamentRepositoryStub, addTournamentRepositoryStub } = makeSut()
    const loadTournamentByIdRepositorySpy = jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById')
    const updateTournamentRepositorySpy = jest.spyOn(updateTournamentRepositoryStub, 'updateTournament')
    const addTournamentRepositorySpy = jest.spyOn(addTournamentRepositoryStub, 'add')

    await sut.save(makeFakeSaveTournamentModelToAdd())
    expect(addTournamentRepositorySpy).toHaveBeenCalledWith(makeFakeSaveTournamentModelToAdd())
    expect(loadTournamentByIdRepositorySpy).not.toBeCalled()
    expect(updateTournamentRepositorySpy).not.toBeCalled()
  })

  test('Should throw if AddTournamentRepository throws', async () => {
    const { sut, addTournamentRepositoryStub } = makeSut()
    jest.spyOn(addTournamentRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.save(makeFakeSaveTournamentModelToAdd())
    await expect(promise).rejects.toThrow()
  })
})
