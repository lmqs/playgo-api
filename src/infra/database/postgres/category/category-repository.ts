
import { AddCategoryRepository } from 'data/usescases/add-category/db-add-category-protocols'
import { CategoryModel } from '../../../../domain/models/category'
import { AddCategoryModel } from '../../../../domain/usecases/add-category'
import { BaseRepository } from '../base-repository'

export class CategoryPostgresRepository extends BaseRepository<AddCategoryModel, CategoryModel>
  implements AddCategoryRepository {
  constructor (
    public readonly tableName: string = 'category'
  ) {
    super(tableName)
  }

  async add (categoryData: AddCategoryModel): Promise<CategoryModel> {
    const result = await this.create(categoryData)
    return result
  }
}
