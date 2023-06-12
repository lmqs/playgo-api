import { CategoryModel } from '@/domain/models/category'
import { IAddCategory } from '@/domain/usecases/category/add-category'

export const addCategoryModelMock: IAddCategory.Params = {
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
}

export const categoryModelMock: CategoryModel = {
  id: 'valid_id',
  description: 'valid_description',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
}
