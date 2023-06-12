import { ICategoryRepository } from '@/data/protocols/db'
import { ILoadCategoriesByTournamentId } from '@/domain/usecases/category/load-categories-by-tournamentId'

export class DbLoadCategoriesUseCase implements ILoadCategoriesByTournamentId {
  constructor (
    private readonly loadCategoryByTournamentIdRepository: ICategoryRepository
  ) {}

  async load (tournamentId: string): Promise<ILoadCategoriesByTournamentId.Result> {
    const categories = await this.loadCategoryByTournamentIdRepository.loadByTournamentId(tournamentId)
    return categories
  }
}
