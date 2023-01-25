import { CategoryModel } from '../../models/category'

export interface LoadCategoriesByTournamentId {
  load: (tournamentId: string) => Promise<CategoryModel[] | undefined>
}
