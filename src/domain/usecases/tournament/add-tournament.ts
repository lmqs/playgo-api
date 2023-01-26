import { TournamentModel } from '../../models/tournament'

export type AddTournamentParams = {
  description: string
  cityId: string
  sportId: string
  dtTournament: string
  registrationLimit: string
  registrationStartDate: string
  registrationFinalDate: string
  deleted?: boolean
}

export interface AddTournament {
  add: (data: AddTournamentParams) => Promise<TournamentModel | undefined>
}
