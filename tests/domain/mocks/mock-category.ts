import { CategoryModel } from '@/domain/models/category'

export const mockCategoryModel = (): CategoryModel => ({
  id: 'valid_id',
  description: 'valid_user',
  tournamentId: 'valid_tournamentId',
  numberAthletes: 'valid_numberAthletes'
})
