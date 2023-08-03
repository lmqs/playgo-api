import { DateHandler } from '@/helpers/date-handler'
import { OutputDbTournamentModel } from '../../../infra/model/db-tournament'

export class TournamentAddRepoModel {
  description: string
  organization: string
  cityId: string
  sportId: string
  dtStartTournament: string
  dtFinalTournament: string
  dtStartRegistration: string
  dtFinalRegistration: string
  otherInformation?: string
  deleted?: boolean

  static toModel (result: OutputDbTournamentModel): TournamentAddRepoModel {
    const dateHelper = new DateHandler()
    return {
      description: result.description,
      organization: result.organization,
      cityId: result.city_id,
      sportId: result.sport_id,
      dtStartTournament: dateHelper.formatDateToString({ input: result.dt_start_tournament }),
      dtFinalTournament: dateHelper.formatDateToString({ input: result.dt_final_tournament }),
      dtStartRegistration: dateHelper.formatDateToString({ input: result.dt_start_registration }),
      dtFinalRegistration: dateHelper.formatDateToString({ input: result.dt_final_registration }),
      otherInformation: result.other_information,
      deleted: result.deleted
    }
  }
}
