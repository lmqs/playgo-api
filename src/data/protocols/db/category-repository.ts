import { CategoryModel } from '@/domain/models/category'

export interface ICategoryRepository {
  add: (category: ICategoryRepository.AddParams) => Promise<ICategoryRepository.AddResult>
  loadByDescriptionAndId: (description: string, id: string) => Promise<ICategoryRepository.LoadResult>
  loadByTournamentId: (tournamentId: string) => Promise<ICategoryRepository.LoadResult>
  remove: (id: string) => Promise<void>
}

export namespace ICategoryRepository {
  export type LoadResult = CategoryModel[]
}

export namespace ICategoryRepository {
  export type AddParams = {
    description: string
    tournamentId: string
    numberAthletes?: string
  }
  export type AddResult = CategoryModel
}

export const dataModelToDbModelMap = (category: ICategoryRepository.AddParams): any => {
  return {
    description: category.description,
    tournament_id: category.tournamentId,
    number_athletes: category.numberAthletes
  }
}
