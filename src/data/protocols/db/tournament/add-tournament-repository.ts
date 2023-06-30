import { InputDbTournamentModel } from '@/data/models/tournament/db-tournament'
import { TournamentModel } from '@/domain/models/tournament'
import { DateHandler } from '@/infra/gateways/date/date-handler'

export interface AddTournamentRepository {
  add: (tournamentModel: AddTournamentRepository.Params) => Promise<AddTournamentRepository.Result>
}

export namespace AddTournamentRepository {
  export type Params = {
    description: string
    organization: string
    cityId: string
    sportId: string
    dtStartTournament: string
    dtFinalTournament: string
    dtStartRegistration: string
    dtFinalRegistration: string
    otherInformation?: string
  }
  export type Result = TournamentModel
}

export const dataModelToDbModelMap = (tournamentModel: AddTournamentRepository.Params): InputDbTournamentModel => {
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
