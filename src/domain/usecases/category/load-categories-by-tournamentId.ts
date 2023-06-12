import { CategoryModel } from '../../models/category'

export interface ILoadCategoriesByTournamentId {
  load: (tournamentId: string) => Promise<ILoadCategoriesByTournamentId.Result | undefined>
}

export namespace ILoadCategoriesByTournamentId {
  export type Result = CategoryModel[]
}
