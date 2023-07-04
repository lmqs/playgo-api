import { RegistrationsAthleteWaitingModel } from '@/domain/models/registrations-athlete-waiting'

export interface IRegistrationsAthleteWaitingRepository {
  add: (data: IRegistrationsAthleteWaitingRepository.AddParams) => Promise<IRegistrationsAthleteWaitingRepository.Result>
  loadById: (id: string) => Promise<IRegistrationsAthleteWaitingRepository.Result | undefined>
  loadByRegistrationsWaiting: (registrationsWaitingId: string) => Promise<IRegistrationsAthleteWaitingRepository.LoadResult>
  remove: (id: string) => Promise<void>
}

export namespace IRegistrationsAthleteWaitingRepository {
  export type AddParams = {
    registrationsWaitingId: string
    athleteId: string
  }
  export type LoadResult = RegistrationsAthleteWaitingModel[]
  export type Result = RegistrationsAthleteWaitingModel
}

export const dataModelToDbModelMapRegistrationsAthleteWaiting = (
  registrationsAthleteWaitingModel: IRegistrationsAthleteWaitingRepository.AddParams
): any => {
  return {
    registrations_waiting_id: registrationsAthleteWaitingModel.registrationsWaitingId,
    athlete_id: registrationsAthleteWaitingModel.athleteId
  }
}
