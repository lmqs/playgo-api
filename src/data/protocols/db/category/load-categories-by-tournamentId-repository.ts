import { CategoryModel } from '../../../../domain/models/category'

export interface LoadCategoryByTournamentIdRepository {
  loadByTournamentId: (tournamentId: string) => Promise<LoadCategoryByTournamentIdRepository.Result | undefined>
}

export namespace LoadCategoryByTournamentIdRepository {
  export type Result = CategoryModel[]
}
