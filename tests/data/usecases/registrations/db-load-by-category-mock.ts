import { IRegistrationsAthleteRepository, IRegistrationsRepository } from '@/data/protocols/db'
import { ILoadRegistrationByCategoryId } from '@/domain/usecases/registration/load-by-category-id '

export const loadRegistrationsByCategoryMock: IRegistrationsRepository.LoadResult =
[{
  id: '20',
  categoryId: '10',
  registrationDate: '30/10/2023',
  deleted: false
}, {
  id: '21',
  categoryId: '10',
  registrationDate: '30/10/2023',
  deleted: false
}]

export const accountAthlete1 = {
  id: '1',
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
  id: '2',
  name: 'Ana',
  gender: 'F',
  password: 'passw0rd',
  email: 'ana@email.com',
  cityId: 1,
  phoneNumber: '7993123953',
  dateBirthday: '20/10/1992',
  deleted: false
}

export const accountAthlete3 = {
  id: '3',
  name: 'Maria',
  gender: 'F',
  password: 'passw01ard',
  email: 'mama@email.com',
  cityId: 1,
  phoneNumber: '7993123953',
  dateBirthday: '20/10/1992',
  deleted: false
}

export const accountAthlete4 = {
  id: '4',
  name: 'Neide',
  gender: 'F',
  password: 'passw01ard',
  email: 'nene@email.com',
  cityId: 1,
  phoneNumber: '7993123953',
  dateBirthday: '20/10/1992',
  deleted: false
}

export const loadRegistrationAthleteByRegistrationModelMock: IRegistrationsAthleteRepository.LoadResult = [
  {
    id: '1',
    registrationsId: '20',
    athleteId: '3',
    isPay: false
  }, {
    id: '2',
    registrationsId: '20',
    athleteId: '4',
    isPay: false
  }
]

export const loadRegistrationAthleteByRegistrationModelMock2: IRegistrationsAthleteRepository.LoadResult = [
  {
    id: '1',
    registrationsId: '21',
    athleteId: '1',
    isPay: false
  }, {
    id: '2',
    registrationsId: '21',
    athleteId: '2',
    isPay: false
  }
]

export const loadByCategoryResultMock: ILoadRegistrationByCategoryId.Result = [
  {
    id: '20',
    athletes: [{
      id: '1',
      name: 'Claudia',
      photo: undefined,
      isPay: false,
      canDeleted: true
    }, {
      id: '2',
      name: 'Ana',
      photo: undefined,
      isPay: false,
      canDeleted: false
    }]
  },
  {
    id: '21',
    athletes: [{
      id: '3',
      name: 'Maria',
      photo: undefined,
      isPay: false,
      canDeleted: false
    }, {
      id: '4',
      name: 'Neide',
      photo: undefined,
      isPay: false,
      canDeleted: false
    }]
  }
]
