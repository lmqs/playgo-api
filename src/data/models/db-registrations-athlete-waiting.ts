import { RegistrationsAthleteWaitingModel } from '@/domain/models/registrations-athlete-waiting'

export type InputDbRegistrationsAthleteWaiting = {
  registrations_waiting_id: string
  athlete_id: string
  deleted?: boolean
}

export type OutputDbRegistrationsAthleteWaiting = {
  id: string
  registrations_waiting_id: string
  athlete_id: string
  date: Date
  deleted?: boolean
}

export const dbModelToDataModelMapRegistrationsAthleteWaiting =
(dbRegistrationsAthleteWaiting: OutputDbRegistrationsAthleteWaiting): RegistrationsAthleteWaitingModel => {
  return (
    dbRegistrationsAthleteWaiting && {
      id: dbRegistrationsAthleteWaiting.id,
      registrationsWaitingId: dbRegistrationsAthleteWaiting.registrations_waiting_id,
      athleteId: dbRegistrationsAthleteWaiting.athlete_id,
      deleted: dbRegistrationsAthleteWaiting.deleted
    }
  )
}
