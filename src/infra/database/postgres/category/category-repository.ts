import { InputDbCategoryModel, OutputDbCategoryModel, dbModelToDataModelMap } from '@/data/models/db-category'
import { ICategoryRepository, dataModelToDbModelMap } from '@/data/protocols/db'
import { BaseRepository } from '@/infra/database/postgres/base-repository'
export class CategoryPostgresRepository extends BaseRepository<InputDbCategoryModel, OutputDbCategoryModel>
  implements ICategoryRepository {
  constructor (
    public readonly tableName: string = 'categories'
  ) {
    super(tableName)
  }

  async add (categoryData: ICategoryRepository.AddParams): Promise<ICategoryRepository.AddResult> {
    const result = await this.create(dataModelToDbModelMap(categoryData))
    return dbModelToDataModelMap(result)
  }

  async loadByDescriptionAndId (description: string, id: string): Promise<ICategoryRepository.LoadResult> {
    const categories = await this.findGeneric({ description, tournament_id: id })
    return categories.map((category) => {
      return dbModelToDataModelMap(category)
    })
  }

  async loadByTournamentId (tournamentId: string): Promise<ICategoryRepository.LoadResult> {
    const categories = await this.findGeneric({ tournamentId })
    return categories.map((category) => {
      return dbModelToDataModelMap(category)
    })
  }

  async remove (id: string): Promise<void> {
    await this.delete(id)
  }
}
