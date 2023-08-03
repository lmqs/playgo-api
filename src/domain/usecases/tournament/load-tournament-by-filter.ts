export interface ILoadTournamentByFilter {
  loadDateFilter: () => Promise<ILoadTournamentByFilter.Result | undefined>
}

export namespace ILoadTournamentByFilter {
  export type Result = {
    opened: tournamentModel[]
    finished: tournamentModel[]
  }
}

type tournamentModel = {
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
  dtFinalTournamentFormatted: string
  dtStartTournamentFormatted: string
  dtStartRegistrationFormatted: string
  dtFinalRegistrationFormatted: string
}
