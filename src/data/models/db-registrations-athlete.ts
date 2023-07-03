import { RegistrationsAthleteModel } from '@/domain/models/registrations-athlete'

export type InputDbRegistrationsAthlete = {
  registrationsId: string
  athleteId: string
  isPay: boolean
  deleted?: boolean
}

export type OutputDbRegistrationsAthlete = {
  id: string
  registrations_id: string
  athlete_id: string
  is_pay: boolean
  deleted?: boolean
}

export const dbModelToDataModelMapRegistrationsAthlete =
(dbRegistrationsAthlete: OutputDbRegistrationsAthlete): RegistrationsAthleteModel => {
  return (
    dbRegistrationsAthlete && {
      id: dbRegistrationsAthlete.id,
      registrationsId: dbRegistrationsAthlete.registrations_id,
      athleteId: dbRegistrationsAthlete.athlete_id,
      isPay: dbRegistrationsAthlete.is_pay,
      deleted: dbRegistrationsAthlete.deleted
    }
  )
}
