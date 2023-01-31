import { mockSportAllModel, mockSportModel } from '@/tests/domain/mocks/mock-sport'
import { AddSportRepository, LoadSportByDescriptionRepository, LoadSportByIdRepository, LoadSportsRepository, SportModel } from '../usescases/sport'

export const mockAddSportRepository = (): AddSportRepository => {
  class AddSportRepositoryStub implements AddSportRepository {
    async add (data: AddSportRepository.Params): Promise<AddSportRepository.Result> {
      return mockSportModel()
    }
  }
  return new AddSportRepositoryStub()
}

export const mockLoadSportByIdRepository = (): LoadSportByIdRepository => {
  class LoadSportByIdRepository implements LoadSportByIdRepository {
    async loadById (id: string): Promise<SportModel> {
      return mockSportModel()
    }
  }
  return new LoadSportByIdRepository()
}

export const mockLoadSportByDescriptionRepository = (): LoadSportByDescriptionRepository => {
  class LoadSportByDescriptionRepositoryStub implements LoadSportByDescriptionRepository {
    async loadByDescription (description: string): Promise<SportModel> {
      return mockSportModel()
    }
  }
  return new LoadSportByDescriptionRepositoryStub()
}

export const mockEmptyLoadSportByDescriptionRepository = (): LoadSportByDescriptionRepository => {
  class LoadSportByDescriptionRepositoryStub implements LoadSportByDescriptionRepository {
    async loadByDescription (description: string): Promise<SportModel | undefined> {
      return undefined
    }
  }
  return new LoadSportByDescriptionRepositoryStub()
}

export const mockLoadSportsRepository = (): LoadSportsRepository => {
  class LoadSportsRepositoryStub implements LoadSportsRepository {
    async loadAll (): Promise<LoadSportsRepository.Result | undefined> {
      return await new Promise(resolve => { resolve(mockSportAllModel()) })
    }
  }
  return new LoadSportsRepositoryStub()
}
