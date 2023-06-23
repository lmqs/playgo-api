import { BaseRepository } from '@/infra/service/base-repository-service'
import { ICityRepository } from '@/data/protocols/db/city'
import { InputDbCityModel, OutputDbCityModel } from '@/data/models/db-city'

export class CityPostgresRepository extends BaseRepository<InputDbCityModel, OutputDbCityModel> implements ICityRepository {
  constructor (public readonly tableName: string = 'cities') {
    super(tableName)
  }

  async loadById (id: string): Promise<ICityRepository.LoadByIdResult | undefined> {
    const sports = await this.findGeneric({ id })
    return sports[0]
  }

  async loadAll (): Promise<ICityRepository.LoadAllResult> {
    return await this.findAll()
  }
}
