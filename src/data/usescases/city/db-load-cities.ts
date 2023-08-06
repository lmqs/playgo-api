import { ICityRepository } from '@/data/protocols/db/city-repository'
import { ILoadAllCities } from '@/domain/usecases/city/load-cities'

export class DbLoadCitiesUseCase implements ILoadAllCities {
  constructor (
    private readonly loadCitiesRepository: ICityRepository
  ) {}

  async load (): Promise<ILoadAllCities.Result> {
    return await this.loadCitiesRepository.loadAll()
  }
}
