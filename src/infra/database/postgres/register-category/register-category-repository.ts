
import { InputDbRegisterCategoryModel, OutputDbRegisterCategoryModel, dbModelToDataModelMapRegisterCategory } from '@/data/models/db-register-category'
import { IRegisterCategoryRepository, dataModelToDbModelMapRegisterCategory } from '@/data/protocols/db/register-category-repository'
import { BaseRepository } from '@/infra/service/base-repository-service'

export class RegisterCategoryPostgresRepository
  extends BaseRepository<InputDbRegisterCategoryModel, OutputDbRegisterCategoryModel> implements IRegisterCategoryRepository {
  constructor (public readonly tableName: string = 'register_category') {
    super(tableName)
  }

  async add (data: IRegisterCategoryRepository.AddParams): Promise<IRegisterCategoryRepository.Result> {
    const result = await this.create(dataModelToDbModelMapRegisterCategory(data))
    return dbModelToDataModelMapRegisterCategory(result)
  }

  async loadById (id: string): Promise<IRegisterCategoryRepository.Result | undefined> {
    const tournamentSponsor = await this.findGeneric({ id })
    return dbModelToDataModelMapRegisterCategory(tournamentSponsor[0])
  }

  async remove (id: string): Promise<void> {
    await this.delete(id)
  }
}
