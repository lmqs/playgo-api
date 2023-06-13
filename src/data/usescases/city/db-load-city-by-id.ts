import { ICityRepository } from '@/data/protocols/db/city'
import { ILoadCityById } from '@/domain/usecases/city/load-city-by-id'

export class DbLoadCityByIdUseCase implements ILoadCityById {
  constructor (
    private readonly loadCityByIdRepository: ICityRepository
  ) {}

  async load (id: string): Promise<ILoadCityById.Result | undefined> {
    return await this.loadCityByIdRepository.loadById(id)
  }
}
