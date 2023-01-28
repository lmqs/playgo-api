import { AddCategoryRepository, AddCategory } from '@/data/usescases/category/add-category/db-add-category-protocols'
import { LoadCategoryByDescriptionAndIdRepository, LoadCategoryByTournamentIdRepository } from '@/data/protocols/db/category'
import { BaseRepository } from '@/infra/database/postgres/base-repository'

export class CategoryPostgresRepository extends BaseRepository<AddCategory.Params, AddCategory.Result>
  implements AddCategoryRepository, LoadCategoryByDescriptionAndIdRepository, LoadCategoryByTournamentIdRepository {
  constructor (
    public readonly tableName: string = 'categories'
  ) {
    super(tableName)
  }

  async add (categoryData: AddCategory.Params): Promise<AddCategory.Result> {
    const result = await this.create(categoryData)
    return result
  }

  async loadByDescriptionAndId (description: string, id: string): Promise<LoadCategoryByDescriptionAndIdRepository.Result | undefined> {
    const categories = await this.findGeneric({ description, tournamentId: id })
    return categories
  }

  async loadByTournamentId (tournamentId: string): Promise<LoadCategoryByTournamentIdRepository.Result | undefined> {
    const categories = await this.findGeneric({ tournamentId })
    return categories
  }
}
