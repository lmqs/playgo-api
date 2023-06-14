import { CategoryModel } from '@/domain/models/category'

export interface ICategoryRepository {
  add: (category: ICategoryRepository.AddParams) => Promise<ICategoryRepository.AddResult>
  loadByDescriptionAndId: (description: string, id: string) => Promise<ICategoryRepository.LoadResult>
  loadByTournamentId: (tournamentId: string) => Promise<ICategoryRepository.LoadResult>
  loadById: (id: string) => Promise<ICategoryRepository.LoadByIdResult>
  updateData: (category: ICategoryRepository.UpdateParams) => Promise<ICategoryRepository.UpdateResult>
  remove: (id: string) => Promise<void>
}

export namespace ICategoryRepository {
  export type LoadResult = CategoryModel[]
  export type LoadByIdResult = CategoryModel
  export type AddParams = {
    description: string
    tournamentId: string
    numberAthletes?: string
  }
  export type AddResult = CategoryModel
  export type UpdateParams = CategoryModel
  export type UpdateResult = CategoryModel
}

export const dataModelToDbModelMap = (category: ICategoryRepository.AddParams): any => {
  return {
    description: category.description,
    tournament_id: category.tournamentId,
    number_athletes: category.numberAthletes
  }
}
