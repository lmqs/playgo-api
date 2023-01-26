
import { AddCategoryRepository, AddCategoryParams } from '../../../../data/usescases/category/add-category/db-add-category-protocols'
import { LoadCategoryByDescriptionAndIdRepository, LoadCategoryByTournamentIdRepository } from '../../../../data/protocols/db/category/'
import { CategoryModel } from '../../../../domain/models/category'
import { BaseRepository } from '../base-repository'

export class CategoryPostgresRepository extends BaseRepository<AddCategoryParams, CategoryModel>
  implements AddCategoryRepository, LoadCategoryByDescriptionAndIdRepository, LoadCategoryByTournamentIdRepository {
  constructor (
    public readonly tableName: string = 'categories'
  ) {
    super(tableName)
  }

  async add (categoryData: AddCategoryParams): Promise<CategoryModel> {
    const result = await this.create(categoryData)
    return result
  }

  async loadByDescriptionAndId (description: string, id: string): Promise<CategoryModel[] | undefined> {
    const categories = await this.findGeneric({ description, tournamentId: id })
    return categories
  }

  async loadByTournamentId (tournamentId: string): Promise<CategoryModel[] | undefined> {
    const categories = await this.findGeneric({ tournamentId })
    return categories
  }
}
