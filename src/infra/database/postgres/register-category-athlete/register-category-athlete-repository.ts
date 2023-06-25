
import { InputDbRegisterCategoryAthleteModel, OutputDbRegisterCategoryAthleteModel, dbModelToDataModelMapRegisterCategoryAthlete } from '@/data/models/db-register-category-athlete'
import { IRegisterCategoryAthleteAthleteRepository, dataModelToDbModelMapRegisterCategoryAthlete } from '@/data/protocols/db/register-category-athlete-repository'
import { BaseRepository } from '@/infra/service/base-repository-service'

export class RegisterCategoryAthletePostgresRepository
  extends BaseRepository<InputDbRegisterCategoryAthleteModel, OutputDbRegisterCategoryAthleteModel>
  implements IRegisterCategoryAthleteAthleteRepository {
  constructor (public readonly tableName: string = 'register_category_athlete') {
    super(tableName)
  }

  async add (data: IRegisterCategoryAthleteAthleteRepository.AddParams): Promise<IRegisterCategoryAthleteAthleteRepository.Result> {
    const result = await this.create(dataModelToDbModelMapRegisterCategoryAthlete(data))
    return dbModelToDataModelMapRegisterCategoryAthlete(result)
  }

  async loadById (id: string): Promise<IRegisterCategoryAthleteAthleteRepository.Result | undefined> {
    const result = await this.findGeneric({ id })
    return dbModelToDataModelMapRegisterCategoryAthlete(result[0])
  }

  async loadByRegisterCategory (registerCategoryId: string): Promise<IRegisterCategoryAthleteAthleteRepository.LoadResult> {
    const result = await this.findGeneric({ register_category_id: registerCategoryId })
    return result.map((model) => {
      return dbModelToDataModelMapRegisterCategoryAthlete(model)
    })
  }

  async remove (id: string): Promise<void> {
    await this.delete(id)
  }
}
