
export interface IRemoveTournamentPaymentsUseCase {
  remove: (id: string) => Promise<IRemoveTournamentPaymentsUseCase.Result>
}
export namespace IRemoveTournamentPaymentsUseCase {
  export type Result = boolean
}
