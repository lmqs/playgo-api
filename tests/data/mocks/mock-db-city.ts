import { CityModel } from '@/domain/models/city'
import { mockCitiesModel, mockCityModel } from '@/tests/domain/mocks/mock-city'
import { LoadCitiesRepository, LoadCityByIdRepository } from '@/data/protocols/db/city'

export const mockLoadCityByIdRepository = (): LoadCityByIdRepository => {
  class LoadCityByIdRepositoryStub implements LoadCityByIdRepository {
    async loadById (id: string): Promise<CityModel> {
      return mockCityModel()
    }
  }
  return new LoadCityByIdRepositoryStub()
}

export const mockLoadCitiesRepository = (): LoadCitiesRepository => {
  class LoadCitiesRepositoryStub implements LoadCitiesRepository {
    async loadAll (): Promise<LoadCitiesRepository.Result | undefined> {
      return await new Promise(resolve => { resolve(mockCitiesModel()) })
    }
  }
  return new LoadCitiesRepositoryStub()
}
