import { LoadCityByIdRepository } from '@/data/protocols/db/city'
import { LoadCityById } from '@/domain/usecases/city/load-city-by-id'

export class DbLoadCityById implements LoadCityById {
  constructor (
    private readonly loadCityByIdRepository: LoadCityByIdRepository
  ) {}

  async load (id: string): Promise<LoadCityByIdRepository.Result | undefined> {
    return await this.loadCityByIdRepository.loadById(id)
  }
}
