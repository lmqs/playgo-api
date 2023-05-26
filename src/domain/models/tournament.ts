
export type TournamentModel = {
  id: string
  description: string
  organization: string
  cityId: string
  sportId: string
  dtStartTournament: String
  dtFinalTournament: String
  dtStartRegistration: String
  dtFinalRegistration: String
  otherInformation?: string
  deleted?: boolean
}
