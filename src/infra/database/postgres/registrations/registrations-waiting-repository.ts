
import { InputDbRegistrationsWaiting, OutputDbRegistrationsWaiting, dbModelToDataModelMapRegistrationsWaiting } from '@/data/models/db-registrations-waiting'
import { IRegistrationsWaitingRepository, dataModelToDbModelMapRegistrationsWaiting } from '@/data/protocols/db/registrations-waiting-repository'
import { BaseRepository } from '@/infra/service/base-repository-service'

export class RegistrationsWaitingPostgresRepository extends BaseRepository<InputDbRegistrationsWaiting, OutputDbRegistrationsWaiting>
  implements IRegistrationsWaitingRepository {
  constructor (public readonly tableName: string = 'registrations_waiting') {
    super(tableName)
  }

  async add (data: IRegistrationsWaitingRepository.AddParams): Promise<IRegistrationsWaitingRepository.Result> {
    const result = await this.create(dataModelToDbModelMapRegistrationsWaiting(data))
    return dbModelToDataModelMapRegistrationsWaiting(result)
  }

  async loadById (id: string): Promise<IRegistrationsWaitingRepository.Result | undefined> {
    const result = await this.findGeneric({ id, deleted: false })
    return dbModelToDataModelMapRegistrationsWaiting(result[0])
  }

  async loadByCategory (categoryId: string): Promise<IRegistrationsWaitingRepository.LoadResult> {
    const result = await this.findGeneric({ category_id: categoryId, deleted: false })
    return result.map((model) => {
      return dbModelToDataModelMapRegistrationsWaiting(model)
    })
  }

  async remove (id: string): Promise<void> {
    await this.delete(id)
  }
}
