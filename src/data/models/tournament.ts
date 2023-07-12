export type TournamentRepoModel = {
  id: string
  description: string
  organization: string
  cityId: string
  sportId: string
  dtStartTournament: string
  dtFinalTournament: string
  dtStartRegistration: string
  dtFinalRegistration: string
  otherInformation: string
  deleted: boolean
}
