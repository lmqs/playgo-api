
export type TournamentModel = {
  id: string
  description: string
  cityId: string
  sportId: string
  dtTournament: string
  registrationLimit?: number
  registrationStartDate: string
  registrationFinalDate: string
  deleted?: boolean
}
