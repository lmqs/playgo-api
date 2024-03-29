import { DateHandler } from '@/helpers/date-handler'
import { OutputDbTournamentModel } from '../../../infra/model/db-tournament'

export class TournamentRepoModel {
  id: string
  description: string
  organization: string
  cityId: string
  sportId: string
  dtStartTournament: string
  dtFinalTournament: string
  dtStartRegistration: string
  dtFinalRegistration: string
  dtFinalTournamentFormatted: string
  dtStartTournamentFormatted: string
  dtStartRegistrationFormatted: string
  dtFinalRegistrationFormatted: string
  otherInformation: string
  deleted: boolean

  static toModel (result: OutputDbTournamentModel): TournamentRepoModel {
    const dateHelper = new DateHandler()
    return {
      id: result.id,
      description: result.description,
      organization: result.organization,
      cityId: result.city_id,
      sportId: result.sport_id,
      dtStartTournament: dateHelper.formatDateToString({ input: result.dt_start_tournament }),
      dtFinalTournament: dateHelper.formatDateToString({ input: result.dt_final_tournament }),
      dtStartRegistration: dateHelper.formatDateToString({ input: result.dt_start_registration }),
      dtFinalRegistration: dateHelper.formatDateToString({ input: result.dt_final_registration }),
      dtFinalRegistrationFormatted: dateHelper.fullDate({ startDate: result.dt_final_registration }),
      dtStartRegistrationFormatted: dateHelper.fullDate({ startDate: result.dt_start_registration }),
      dtFinalTournamentFormatted: dateHelper.fullDate({ startDate: result.dt_final_tournament }),
      dtStartTournamentFormatted: dateHelper.fullDate({ startDate: result.dt_start_tournament }),
      otherInformation: result.other_information,
      deleted: result.deleted
    }
  }

  static mapCollection (model: OutputDbTournamentModel[]): TournamentRepoModel[] {
    return model.map((tournament) => { return this.toModel(tournament) })
  }
}
