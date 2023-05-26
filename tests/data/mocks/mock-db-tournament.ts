import { mockTournamentModel } from '@/tests/domain/mocks'
import { AddTournamentRepository, LoadTournamentByIdRepository, LoadTournamentsRepository } from '@/data/protocols/db/tournament'
import { AddTournament } from '@/domain/usecases/tournament/add-tournament'

export const mockLoadTournamentsRepositoryModel = (): LoadTournamentsRepository.Result => {
  return [{
    id: 'valid_id',
    description: 'valid_description',
    cityId: 'valid_id',
    sportId: 'valid_sportId',
    dtStartTournament: '25/05/2023',
    dtFinalTournament: '25/05/2023',
    dtStartRegistration: '25/05/2023',
    dtFinalRegistration: '25/05/2023',
    otherInformation: 'any_information',
    organization: 'organization',
    deleted: true
  },
  {
    id: 'valid__other_id',
    description: 'valid_description',
    cityId: 'valid_id',
    sportId: 'valid_sportId',
    dtStartTournament: '25/05/2023',
    dtFinalTournament: '25/05/2023',
    dtStartRegistration: '25/05/2023',
    dtFinalRegistration: '25/05/2023',
    otherInformation: 'any_information',
    organization: 'organization',
    deleted: true
  }]
}

export const mockAddTournamentRepository = (): AddTournamentRepository => {
  class AddTournamentRepositoryStub implements AddTournamentRepository {
    async add (data: AddTournament.Params): Promise<AddTournament.Result> {
      return mockTournamentModel()
    }
  }
  return new AddTournamentRepositoryStub()
}

export const mockLoadTournamentsRepository = (): LoadTournamentsRepository => {
  class LoadTournamentsRepositoryStub implements LoadTournamentsRepository {
    async loadAll (): Promise<LoadTournamentsRepository.Result | undefined> {
      return await new Promise(resolve => { resolve(mockLoadTournamentsRepositoryModel()) })
    }
  }
  return new LoadTournamentsRepositoryStub()
}

export const mockLoadTournamentByIdRepository = (): LoadTournamentByIdRepository => {
  class LoadTournamentByIdRepositoryStub implements LoadTournamentByIdRepository {
    async loadById (id: string): Promise<LoadTournamentByIdRepository.Result | undefined> {
      return await new Promise(resolve => { resolve(mockTournamentModel()) })
    }
  }
  return new LoadTournamentByIdRepositoryStub()
}
