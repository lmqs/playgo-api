import { IAddRegistrations } from '@/domain/usecases/registration/add-registrations'
import { AddRegistrationsController } from './add-registrations-controller'

export const requestMock: AddRegistrationsController.Request = {
  categoryId: '1',
  registrationDate: '03/08/2023',
  athletesId: '1',
  isPay: false,
  accountId: '1'
}

export const addResultMock: IAddRegistrations.ResultObj = [
  {
    id: '20',
    registrationsId: '10',
    athlete: {
      id: '3',
      name: 'Claudia'
    },
    isPay: false,
    deleted: false
  }, {
    id: '21',
    registrationsId: '10',
    athlete: {
      id: '4',
      name: 'Ana'
    },
    isPay: false,
    deleted: false
  }]
