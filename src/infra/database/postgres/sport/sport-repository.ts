import { BaseRepository } from '@/infra/service/base-repository-service'
import { SportModel } from '@/domain/models/sport'
import { AddSportRepository, LoadSportByDescription, LoadSportByDescriptionRepository, LoadSportByIdRepository, LoadSportsRepository } from '@/data/usescases/sport'

export class SportPostgresRepository extends BaseRepository<AddSportRepository.Params, SportModel>
  implements AddSportRepository, LoadSportByDescriptionRepository, LoadSportByIdRepository,
  LoadSportsRepository {
  constructor (
    public readonly tableName: string = 'sports'
  ) {
    super(tableName)
  }

  async add (data: AddSportRepository.Params): Promise<AddSportRepository.Result> {
    return await this.create(data)
  }

  async loadByDescription (description: string): Promise<LoadSportByDescription.Result | undefined> {
    return await this.findOne('description', description)
  }

  async loadById (id: string): Promise<LoadSportByIdRepository.Result | undefined> {
    const sports = await this.findGeneric({ id })
    return sports[0]
  }

  async loadAll (): Promise<LoadSportsRepository.Result | undefined> {
    return await this.findAll()
  }
}
