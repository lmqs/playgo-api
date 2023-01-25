import { DbLoadTournamentById } from './load-tournaments-by-id'
import { LoadTournamentByIdRepository, TournamentModel } from './load-tournaments-by-id-protocols'

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

type SutTypes = {
  sut: DbLoadTournamentById
  loadTournamentByIdRepositoryStub: LoadTournamentByIdRepository
}

const makeLoadTournamentByIdRepository = (): LoadTournamentByIdRepository => {
  class LoadTournamentByIdRepositoryStub implements LoadTournamentByIdRepository {
    async loadById (id: string): Promise<TournamentModel | undefined> {
      return await new Promise(resolve => { resolve(makeFakeTournamentModel()) })
    }
  }
  return new LoadTournamentByIdRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadTournamentByIdRepositoryStub = makeLoadTournamentByIdRepository()
  const sut = new DbLoadTournamentById(loadTournamentByIdRepositoryStub)
  return {
    sut,
    loadTournamentByIdRepositoryStub
  }
}

describe('DbLoadTournamentById UseCase', () => {
  test('Should call LoadTournamentByIdRepository with correct values', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    const loadTournamentByIdRepositorySpy = jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById')

    await sut.load('valid_id')
    expect(loadTournamentByIdRepositorySpy).toHaveBeenCalledWith('valid_id')
  })

  test('Should return undefined if LoadTournamentByIdRepository return empty', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise(resolve => { resolve(undefined) }))
    const tournament = await sut.load('valid_id')

    expect(tournament).toBeUndefined()
  })

  test('Should throw if loadTournamentByIdRepository throws', async () => {
    const { sut, loadTournamentByIdRepositoryStub } = makeSut()
    jest.spyOn(loadTournamentByIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.load('valid_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should return an tournament on Sucess', async () => {
    const { sut } = makeSut()

    const account = await sut.load('valid_id')
    expect(account).toEqual(makeFakeTournamentModel())
  })
})
