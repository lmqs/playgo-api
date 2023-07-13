import { CategoryRepoModel } from '@/data/models/db-category'
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
  export type LoadResult = CategoryRepoModel[]
  export type LoadByIdResult = CategoryRepoModel
  export type AddParams = {
    description: string
    tournamentId: string
    numberAthletesRegistration: string
    numberAthletes?: string
  }
  export type AddResult = CategoryRepoModel
  export type UpdateParams = CategoryModel
  export type UpdateResult = CategoryRepoModel
}

export const dataModelToDbModelMap = (category: ICategoryRepository.AddParams): any => {
  return {
    description: category.description,
    tournament_id: category.tournamentId,
    number_athletes: category.numberAthletes,
    number_athletes_registration: category.numberAthletesRegistration
  }
}
