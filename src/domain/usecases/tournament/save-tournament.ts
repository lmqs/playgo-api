import { TournamentModel } from '../../models/tournament'

export type SaveTournamentModel = {
  id?: string
  description: string
  cityId: string
  sportId: string
  dtTournament: string
  registrationLimit: string
  registrationStartDate: string
  registrationFinalDate: string
  deleted?: boolean
}

export interface SaveTournament {
  save: (data: SaveTournamentModel) => Promise<TournamentModel | undefined>
}
