import { InputDbRegisterCategoryModel, OutputDbRegisterCategoryModel } from '@/data/models/db-register-category'

export const addRegisterCategoryModelMock: InputDbRegisterCategoryModel = {
  categoryId: 'any_category',
  registerDate: '24/06/2023'
}

export const dbRegisterCategoryModelMock: OutputDbRegisterCategoryModel = {
  id: '1',
  category_id: 'any_category',
  register_date: '24/06/2023',
  deleted: false
}
