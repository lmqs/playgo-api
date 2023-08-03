import { DateHandler } from '@/helpers/date-handler'
import { TournamentAddRepoModel } from '@/data/models/tournament/db-add-tournament'

export type InputDbTournamentModel = {
  description: string
  organization: string
  city_id: string
  sport_id: string
  dt_start_tournament?: Date
  dt_final_tournament?: Date
  dt_start_registration?: Date
  dt_final_registration?: Date
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
  other_information: string
  deleted: boolean
}

export const domainToDbAddModelMap = (tournamentModel: TournamentAddRepoModel): InputDbTournamentModel => {
  const dateClass = new DateHandler()
  return {
    description: tournamentModel.description,
    organization: tournamentModel.organization,
    city_id: tournamentModel.cityId,
    sport_id: tournamentModel.sportId,
    dt_start_tournament: dateClass.format(tournamentModel.dtStartTournament),
    dt_final_tournament: dateClass.format(tournamentModel.dtFinalTournament),
    dt_start_registration: dateClass.format(tournamentModel.dtStartRegistration),
    dt_final_registration: dateClass.format(tournamentModel.dtFinalRegistration),
    other_information: tournamentModel.otherInformation
  }
}
