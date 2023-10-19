
export interface ILoadCategoriesByTournamentId {
  load: (input: ILoadCategoriesByTournamentId.Params) => Promise<ILoadCategoriesByTournamentId.Result>
}

export namespace ILoadCategoriesByTournamentId {
  export type Params = {
    tournamentId: string
    accountId: string
  }
  export type Result = Array<{
    id: string
    description: string
    tournamentId: string
    numberAthletes: string
    numberAthletesRegistration: string
    deleted: boolean
    numberRegistration: number
    isUserLoggedRegistered: boolean
  }>
}
