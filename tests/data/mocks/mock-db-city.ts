import { CityModel } from '@/domain/models/city'
import { LoadCityByIdRepository } from '@/data/protocols/db/city'
import { mockCityModel } from '../../infra/database/city-repository-mock'

export const mockLoadCityByIdRepository = (): LoadCityByIdRepository => {
  class LoadCityByIdRepositoryStub implements LoadCityByIdRepository {
    async loadById (id: string): Promise<CityModel> {
      return mockCityModel
    }
  }
  return new LoadCityByIdRepositoryStub()
}
