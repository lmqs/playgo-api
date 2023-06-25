import { RegisterCategoryModel } from '@/domain/models/register-category'

export type InputDbRegisterCategoryModel = {
  categoryId: string
  registerDate: string
  deleted?: boolean
}

export type OutputDbRegisterCategoryModel = {
  id: string
  category_id: string
  register_date: string
  deleted?: boolean
}

export const dbModelToDataModelMapRegisterCategory = (dbRegisterCategory: OutputDbRegisterCategoryModel): RegisterCategoryModel => {
  return (
    dbRegisterCategory && {
      id: dbRegisterCategory.id,
      categoryId: dbRegisterCategory.category_id,
      registerDate: dbRegisterCategory.register_date,
      deleted: dbRegisterCategory.deleted
    }
  )
}
