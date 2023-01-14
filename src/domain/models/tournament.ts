
export interface TournamentModel {
  id: string
  description: string
  cityId: string
  sportId: string
  dtTournament: string
  registrationLimit: string
  registrationStartDate: string
  registrationFinalDate: string
  deleted?: boolean
}
