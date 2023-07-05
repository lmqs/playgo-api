import { CategoryModel } from '@/domain/models/category'
import { TournamentModel } from '@/domain/models/tournament'
import { IAddRegistrations } from '@/domain/usecases/registration/add-registrations'

export const registrationsAddParamsMock: IAddRegistrations.Params = {
  categoryId: '15',
  athletesId: '3,4'
}

export const registrationsAddParamsInvalidAthletesMock: IAddRegistrations.Params = {
  categoryId: '15',
  athletesId: '3,4,8,70'
}

export const categoryNotActivatedMock: CategoryModel = {
  id: '1',
  description: 'Dupla Mista A',
  tournamentId: '10',
  numberAthletes: '30',
  numberAthletesRegistration: '2',
  deleted: true
}

export const categoryActivatedMock: CategoryModel = {
  id: '15',
  description: 'Dupla Mista A',
  tournamentId: '10',
  numberAthletes: '3',
  numberAthletesRegistration: '2',
  deleted: false
}

export const tournamentNotActivatedMock: TournamentModel = {
  id: '10',
  description: 'Torneio playgo',
  organization: 'Playgo organização',
  cityId: '100',
  sportId: '1',
  dtStartTournament: '25/07/2023',
  dtFinalTournament: '26/07/2023',
  dtStartRegistration: '25/06/2023',
  dtFinalRegistration: '27/06/2023',
  otherInformation: 'any_information',
  deleted: true
}

export const tournamentDateInvalidMock: TournamentModel = {
  id: '10',
  description: 'Torneio playgo',
  organization: 'Playgo organização',
  cityId: '100',
  sportId: '1',
  dtStartTournament: '25/07/2023',
  dtFinalTournament: '26/07/2023',
  dtStartRegistration: '25/06/2023',
  dtFinalRegistration: '27/06/2023',
  otherInformation: 'any_information',
  deleted: false
}

export const tournamentValidMock: TournamentModel = {
  id: '10',
  description: 'Torneio playgo',
  organization: 'Playgo organização',
  cityId: '100',
  sportId: '1',
  dtStartTournament: '25/07/2023',
  dtFinalTournament: '26/07/2023',
  dtStartRegistration: '25/06/2023',
  dtFinalRegistration: '01/07/2023',
  otherInformation: 'any_information',
  deleted: false
}

export const registrationsInvalidArrayMock = [
  {
    id: '1',
    categoryId: '2',
    registrationDate: '25/06/2023'
  },
  {
    id: '2',
    categoryId: '2',
    registrationDate: '25/06/2023'
  },
  {
    id: '3',
    categoryId: '2',
    registrationDate: '25/06/2023'
  }
]

export const registrationsValidArrayMock = [
  {
    id: '1',
    categoryId: '2',
    registrationDate: '25/06/2023'
  },
  {
    id: '2',
    categoryId: '2',
    registrationDate: '25/06/2023'
  }
]

export const accountModelMock = {
  id: '3',
  name: 'Rick',
  gender: 'M',
  password: 'passw0rd',
  email: 'email@email.com',
  cityId: 1,
  phoneNumber: '79999377953',
  dateBirthday: '20/10/1990',
  deleted: false
}

export const accountRegistrationModelMock = {
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

export const registrationWithAthlete = [
  {
    id: '10',
    athlete_id: '4',
    is_pay: false,
    deleted: false,
    category_id: 15,
    registration_date: '2023-06-27'
  },
  {
    id: '16',
    athlete_id: '40',
    is_pay: false,
    deleted: false,
    category_id: 15,
    registration_date: '2023-06-27'
  }
]

export const registrationModelMock = {
  id: '10',
  categoryId: '15',
  registrationDate: '27/06/2023',
  deleted: false
}

export const registrationsAthleteModelMock = {
  id: '20',
  registrationsId: '10',
  athleteId: '3',
  isPay: false,
  deleted: false
}

export const registrations2AthleteModelMock = {
  id: '21',
  registrationsId: '10',
  athleteId: '4',
  isPay: false,
  deleted: false
}

export const registrationsWaitingModelMock = {
  id: '1',
  categoryId: '15',
  date: '04/07/2023',
  deleted: false
}

export const registrationsAthleteWaitingModelMock = {
  id: '1',
  registrationWaitingId: '1',
  athleteId: '3',
  deleted: false
}

export const registrationsAthleteWaiting2ModelMock = {
  id: '2',
  registrationWaitingId: '1',
  athleteId: '4',
  deleted: false
}