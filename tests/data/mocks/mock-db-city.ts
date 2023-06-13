import { CityModel } from '@/domain/models/city'
import { mockCityModel } from '@/tests/domain/mocks/mock-city'
import { LoadCityByIdRepository } from '@/data/protocols/db/city'

export const mockLoadCityByIdRepository = (): LoadCityByIdRepository => {
  class LoadCityByIdRepositoryStub implements LoadCityByIdRepository {
    async loadById (id: string): Promise<CityModel> {
      return mockCityModel()
    }
  }
  return new LoadCityByIdRepositoryStub()
}
