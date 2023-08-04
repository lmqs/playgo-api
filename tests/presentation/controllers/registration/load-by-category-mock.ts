import { ILoadRegistrationByCategoryId } from '@/domain/usecases/registration/load-by-category-id '
import { LoadRegistrationsByCategoryController } from './load-by-category-controller'

export const requestMock: LoadRegistrationsByCategoryController.Request = {
  categoryId: '1',
  accountId: '1'
}

export const loadByCategoryIdMock: ILoadRegistrationByCategoryId.Result[] = [
  {
    id: '20',
    registrationsId: '10',
    athleteId: {
      id: '3',
      name: 'Claudia',
      photo: undefined
    },
    isPay: false,
    deleted: false,
    canDeleted: false
  }, {
    id: '21',
    registrationsId: '10',
    athleteId: {
      id: '4',
      name: 'Ana',
      photo: undefined
    },
    isPay: false,
    deleted: false,
    canDeleted: false
  }]
