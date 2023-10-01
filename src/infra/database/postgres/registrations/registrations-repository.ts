
import { InputDbRegistrations, OutputDbRegistrations, dbModelToDataModelMapRegistrations } from '@/data/models/db-registrations'
import { IRegistrationsRepository, dataModelToDbModelMapRegistrations } from '@/data/protocols/db/registrations-repository'
import { BaseRepository } from '@/infra/service/base-repository-service'

export class RegistrationsPostgresRepository
  extends BaseRepository<InputDbRegistrations, OutputDbRegistrations> implements IRegistrationsRepository {
  constructor (public readonly tableName: string = 'registrations') {
    super(tableName)
  }

  async add (data: IRegistrationsRepository.AddParams): Promise<IRegistrationsRepository.Result> {
    const result = await this.create(dataModelToDbModelMapRegistrations(data))
    return dbModelToDataModelMapRegistrations(result)
  }

  async loadById (id: string): Promise<IRegistrationsRepository.Result | undefined> {
    const result = await this.findGeneric({ id, deleted: false })
    return dbModelToDataModelMapRegistrations(result[0])
  }

  async loadByCategory (categoryId: string): Promise<IRegistrationsRepository.LoadResult> {
    const result = await this.findGeneric({ category_id: categoryId, deleted: false })
    return result.map((model) => {
      return dbModelToDataModelMapRegistrations(model)
    })
  }

  async remove (id: string): Promise<void> {
    await this.delete(id)
  }
}
