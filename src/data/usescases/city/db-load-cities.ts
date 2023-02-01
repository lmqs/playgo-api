import { LoadCitiesRepository } from '@/data/protocols/db/city'
import { LoadCities } from '@/domain/usecases/city/load-cities'

export class DbLoadCities implements LoadCities {
  constructor (
    private readonly loadCitiesRepository: LoadCitiesRepository
  ) {}

  async load (): Promise<LoadCitiesRepository.Result | undefined> {
    return await this.loadCitiesRepository.loadAll()
  }
}
