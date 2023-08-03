import { IRegistrationsAthleteRepository } from '@/data/protocols/db/registrations-athlete-repository'
import { ILoadRegistrationByCategoryId } from '@/domain/usecases/registration/load-by-category-id '

export const loadRegistrationsAthleteByCategoryMock: IRegistrationsAthleteRepository.LoadCategoryResult =
[{
  id: '20',
  registrationsId: '10',
  athleteId: '3',
  isPay: false,
  deleted: false
}, {
  id: '21',
  registrationsId: '10',
  athleteId: '4',
  isPay: false,
  deleted: false
}]

export const accountAthlete1 = {
  id: '3',
  name: 'Claudia',
  gender: 'F',
  password: 'passw01ard',
  email: 'caca@email.com',
  cityId: 1,
  phoneNumber: '7993123953',
  dateBirthday: '20/10/1992',
  deleted: false
}

export const accountAthlete2 = {
  id: '4',
  name: 'Ana',
  gender: 'F',
  password: 'passw0rd',
  email: 'ana@email.com',
  cityId: 1,
  phoneNumber: '7993123953',
  dateBirthday: '20/10/1992',
  deleted: false
}

export const loadByCategoryResultMock: ILoadRegistrationByCategoryId.Result[] = [
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
