import { RegistrationsModel } from '@/domain/models/registrations'

export type InputDbRegistrations = {
  category_id: string
  registration_date: string
  deleted?: boolean
}

export type OutputDbRegistrations = {
  id: string
  category_id: string
  registration_date: string
  deleted?: boolean
}

export const dbModelToDataModelMapRegistrations = (dbRegisterCategory: OutputDbRegistrations): RegistrationsModel => {
  return (
    dbRegisterCategory && {
      id: dbRegisterCategory.id,
      categoryId: dbRegisterCategory.category_id,
      registrationDate: dbRegisterCategory.registration_date,
      deleted: dbRegisterCategory.deleted
    }
  )
}
