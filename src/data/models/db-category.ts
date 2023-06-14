import { CategoryModel } from '@/domain/models/category'

export type InputDbCategoryModel = {
  description: string
  tournament_id: string
  number_athletes: string
  deleted: boolean
}

export type OutputDbCategoryModel = {
  id: string
  description: string
  tournament_id: string
  number_athletes: string
  deleted: boolean
}

export const dbModelToDataModelMap = (dbCategoryModel: OutputDbCategoryModel): CategoryModel => {
  return (
    dbCategoryModel && {
      id: dbCategoryModel.id,
      description: dbCategoryModel.description,
      tournamentId: dbCategoryModel.tournament_id,
      numberAthletes: dbCategoryModel.number_athletes,
      deleted: dbCategoryModel.deleted
    }
  )
}
