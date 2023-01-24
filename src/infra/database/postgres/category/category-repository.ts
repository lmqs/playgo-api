
import { AddCategoryRepository, AddCategoryModel } from '../../../../data/usescases/category/add-category/db-add-category-protocols'
import { LoadCategoryByDescriptionAndIdRepository } from '../../../../data/protocols/db/category/load-category-by-description-and-id-repository'
import { CategoryModel } from '../../../../domain/models/category'
import { BaseRepository } from '../base-repository'

export class CategoryPostgresRepository extends BaseRepository<AddCategoryModel, CategoryModel>
  implements AddCategoryRepository, LoadCategoryByDescriptionAndIdRepository {
  constructor (
    public readonly tableName: string = 'categories'
  ) {
    super(tableName)
  }

  async add (categoryData: AddCategoryModel): Promise<CategoryModel> {
    const result = await this.create(categoryData)
    return result
  }

  async loadByDescriptionAndId (description: string, id: string): Promise<CategoryModel[] | undefined> {
    const categories = await this.findGeneric({ description, tournamentId: id })
    return categories
  }
}
