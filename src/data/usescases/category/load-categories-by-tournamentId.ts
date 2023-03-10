import { LoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournamentId'
import { LoadCategoryByTournamentIdRepository } from '@/data/protocols/db/category/load-categories-by-tournamentId-repository'

export class DbLoadCategories implements LoadCategoriesByTournamentId {
  constructor (
    private readonly loadCategoryByTournamentIdRepository: LoadCategoryByTournamentIdRepository
  ) {}

  async load (tournamentId: string): Promise<LoadCategoriesByTournamentId.Result | undefined> {
    const categories = await this.loadCategoryByTournamentIdRepository.loadByTournamentId(tournamentId)
    if (categories?.length) {
      return categories
    }
  }
}
