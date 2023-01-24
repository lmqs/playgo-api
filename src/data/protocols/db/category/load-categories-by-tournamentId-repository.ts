import { CategoryModel } from '../../../../domain/models/category'

export interface LoadCategoryByTournamentIdRepository {
  loadByTournamentId: (tournamentId: string) => Promise<CategoryModel[] | undefined>
}
