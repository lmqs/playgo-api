import { LoadCategoryByDescriptionAndIdRepository } from '@/data/protocols/db/category/load-category-by-description-and-id-repository'
import { AddCategory, AddCategoryRepository } from '.'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly loadCategoryByDescriptionAndIdRepository: LoadCategoryByDescriptionAndIdRepository,
    private readonly addCategoryRepository: AddCategoryRepository
  ) {}

  async add (categoryData: AddCategory.Params): Promise<AddCategory.Result | undefined> {
    const isDescriptValid = await this.loadCategoryByDescriptionAndIdRepository.loadByDescriptionAndId(categoryData.description, categoryData.tournamentId)
    if (!isDescriptValid?.length) {
      const category = await this.addCategoryRepository.add(categoryData)
      return category
    }
  }
}
