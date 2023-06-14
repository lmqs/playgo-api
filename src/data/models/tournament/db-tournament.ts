import { TournamentModel } from '@/domain/models/tournament'
import { DateHandler } from '@/infra/gateways/date/date-handler'

export type InputDbTournamentModel = {
  description: string
  organization: string
  city_id: string
  sport_id: string
  dt_start_tournament: Date
  dt_final_tournament: Date
  dt_start_registration: Date
  dt_final_registration: Date
  other_information?: string
  deleted?: boolean
}

export type OutputDbTournamentModel = {
  id: string
  description: string
  organization: string
  city_id: string
  sport_id: string
  dt_start_tournament: Date
  dt_final_tournament: Date
  dt_start_registration: Date
  dt_final_registration: Date
  other_information?: string
  deleted?: boolean
}

export const dbModelToDataModelMap = (dbTournamentModel: OutputDbTournamentModel): TournamentModel => {
  const dateClass = new DateHandler()

  return (
    dbTournamentModel && {
      id: dbTournamentModel.id,
      description: dbTournamentModel.description,
      organization: dbTournamentModel.organization,
      cityId: dbTournamentModel.city_id,
      sportId: dbTournamentModel.sport_id,
      dtStartTournament: dateClass.formatDateToString(dbTournamentModel.dt_start_tournament),
      dtFinalTournament: dateClass.formatDateToString(dbTournamentModel.dt_final_tournament),
      dtStartRegistration: dateClass.formatDateToString(dbTournamentModel.dt_start_registration),
      dtFinalRegistration: dateClass.formatDateToString(dbTournamentModel.dt_final_registration),
      otherInformation: dbTournamentModel?.other_information,
      deleted: dbTournamentModel.deleted
    }
  )
}
