export interface LoadTournamentById {
  load: (id: string) => Promise<LoadTournamentById.Result | undefined>
}

export namespace LoadTournamentById {
  export type Result = {
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
}
