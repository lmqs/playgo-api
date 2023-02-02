import { LoadCategoryByDescriptionAndIdRepository } from '@/data/protocols/db/category/load-category-by-description-and-id-repository'
import { AddCategoryRepository } from '@/data/protocols/db/category'
import { CONSTANTS } from '@/helpers/enumHelper'
import { AddCategory } from '@/presentation/controllers/category'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly loadCategoryByDescriptionAndIdRepository: LoadCategoryByDescriptionAndIdRepository,
    private readonly addCategoryRepository: AddCategoryRepository
  ) {}

  async add (categoryData: AddCategory.Params): Promise<AddCategory.Result | undefined> {
    const isDescriptValid = await this.loadCategoryByDescriptionAndIdRepository.loadByDescriptionAndId(categoryData.description, categoryData.tournamentId)
    categoryData.numberAthletes = !categoryData.numberAthletes ? CONSTANTS.category.numberAthletesDefault : categoryData.numberAthletes
    if (!isDescriptValid?.length) {
      const category = await this.addCategoryRepository.add(categoryData)
      return category
    }
  }
}
