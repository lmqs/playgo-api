import { BaseRepository } from '@/infra/database/postgres/base-repository'
import { CityModel } from '@/domain/models/city'
import { LoadCitiesRepository, LoadCityByIdRepository } from '@/data/protocols/db/city'

export class CityPostgresRepository extends BaseRepository<any, CityModel>
  implements LoadCityByIdRepository, LoadCitiesRepository {
  constructor (
    public readonly tableName: string = 'cities'
  ) {
    super(tableName)
  }

  async loadById (id: string): Promise<LoadCityByIdRepository.Result | undefined> {
    const sports = await this.findGeneric({ id })
    return sports[0]
  }

  async loadAll (): Promise<LoadCitiesRepository.Result | undefined> {
    return await this.findAll()
  }
}
