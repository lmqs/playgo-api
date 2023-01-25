import { TournamentModel } from '../../domain/models/tournament'

export type AddTournamentModel = {
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
  add: (tournament: AddTournamentModel) => Promise<TournamentModel | undefined>
}
