import { InputDbRegistrationsAthlete, OutputDbRegistrationsAthlete } from '@/data/models/db-registrations-athlete'

export const addRegistrationAthleteModelMock: InputDbRegistrationsAthlete = {
  registrationsId: 'any_register_category',
  athleteId: 'any_athlete',
  isPay: false
}

export const dbRegistrationAthleteModelMock: OutputDbRegistrationsAthlete = {
  id: '1',
  registrations_id: 'any_register_category',
  athlete_id: 'any_athlete',
  is_pay: false,
  deleted: false
}

export const dbLoadByCategoryAndUserModelMock: any = [
  {
    athlete_id: 'any_athlete',
    id: '1',
    category_id: '15',
    deleted: false,
    is_pay: false,
    registration_date: '2023-06-30',
    registrations_id: 'any_registrations_id'
  }
]
