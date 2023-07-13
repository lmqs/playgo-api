
export interface ILoadCategoriesByTournamentId {
  load: (tournamentId: string) => Promise<ILoadCategoriesByTournamentId.Result | undefined>
}

export namespace ILoadCategoriesByTournamentId {
  export type Result = Array<{
    id: string
    description: string
    tournamentId: string
    numberAthletes: string
    numberAthletesRegistration: string
    deleted: boolean
    numberRegistration: number
  }>
}
