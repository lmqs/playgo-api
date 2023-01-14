import { LoadTournamentByDescriptionAndIdRepository } from '../protocols/db/tournament/load-tournament-repository'
import { AddCategory, AddCategoryModel, AddCategoryRepository, CategoryModel } from './db-add-category-protocols'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly loadTournamentByDescriptionAndIdRepository: LoadTournamentByDescriptionAndIdRepository,
    private readonly addCategoryRepository: AddCategoryRepository
  ) {}

  async add (categoryData: AddCategoryModel): Promise<CategoryModel | undefined> {
    const isDescriptValid = await this.loadTournamentByDescriptionAndIdRepository.loadByDescriptionAndId(categoryData.description, categoryData.tournamentId)
    if (!isDescriptValid) {
      const category = await this.addCategoryRepository.add(categoryData)
      return category
    }
  }
}
