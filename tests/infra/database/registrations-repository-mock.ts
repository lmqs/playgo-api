import { OutputDbRegistrations } from '@/data/models/db-registrations'
import { IRegistrationsRepository } from '@/data/protocols/db/registrations-repository'

export const addRegisterCategoryModelMock: IRegistrationsRepository.AddParams = {
  categoryId: 'any_category',
  registrationDate: '24/06/2023'
}

export const dbRegisterCategoryModelMock: OutputDbRegistrations = {
  id: '1',
  category_id: 'any_category',
  registration_date: '24/06/2023',
  deleted: false
}
