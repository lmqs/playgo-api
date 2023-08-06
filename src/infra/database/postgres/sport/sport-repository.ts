import { BaseRepository } from '@/infra/service/base-repository-service'
import { SportModel } from '@/domain/models/sport'
import { ISportRepository } from '@/data/protocols/db'

export class SportPostgresRepository extends BaseRepository<ISportRepository.AddParams, SportModel>
  implements ISportRepository {
  constructor (
    public readonly tableName: string = 'sports'
  ) {
    super(tableName)
  }

  async add (data: ISportRepository.AddParams): Promise<ISportRepository.Result> {
    return await this.create(data)
  }

  async loadByDescription (description: string): Promise<ISportRepository.Results> {
    return await this.findGeneric({ description })
  }

  async loadById (id: string): Promise<ISportRepository.Result | undefined> {
    return await this.findOne('id', id)
  }

  async loadAll (): Promise<ISportRepository.Results> {
    return await this.findAll()
  }
}
