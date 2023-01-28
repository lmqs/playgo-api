import { CategoryModel } from '../../models/category'

export interface LoadCategoriesByTournamentId {
  load: (tournamentId: string) => Promise<LoadCategoriesByTournamentId.Result | undefined>
}

export namespace LoadCategoriesByTournamentId {
  export type Result = CategoryModel[]
}
