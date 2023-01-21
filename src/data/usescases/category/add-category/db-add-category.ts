import { LoadCategoryByDescriptionAndIdRepository } from '../../protocols/db/category/load-category-by-description-and-id-repository'
import { AddCategory, AddCategoryModel, AddCategoryRepository, CategoryModel } from './db-add-category-protocols'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly loadCategoryByDescriptionAndIdRepository: LoadCategoryByDescriptionAndIdRepository,
    private readonly addCategoryRepository: AddCategoryRepository
  ) {}

  async add (categoryData: AddCategoryModel): Promise<CategoryModel | undefined> {
    const isDescriptValid = await this.loadCategoryByDescriptionAndIdRepository.loadByDescriptionAndId(categoryData.description, categoryData.tournamentId)
    if (!isDescriptValid?.length) {
      const category = await this.addCategoryRepository.add(categoryData)
      return category
    }
  }
}
