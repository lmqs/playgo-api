import { IRegistrationsAthleteWaitingRepository } from '@/data/protocols/db/registrations-athlete-waiting-repository'

export const registrationAthleteWaitingMock = {
  id: '1',
  registrationsWaitingId: '1',
  athleteId: '1',
  deleted: false
}

export const registrationAthleteWaitingDbMock = {
  id: '1',
  registrations_waiting_id: '1',
  athlete_id: '1',
  deleted: false
}

export const registrationAthleteWaitingAddParamsMock: IRegistrationsAthleteWaitingRepository.AddParams = {
  registrationsWaitingId: '1',
  athleteId: '1'
}
