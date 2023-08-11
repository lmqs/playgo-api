import { TournamentPaymentsModel } from '@/domain/models/tournament_payments'

export interface IAddTournamentPaymentsUseCase {
  add: (data: IAddTournamentPaymentsUseCase.Params) => Promise<IAddTournamentPaymentsUseCase.Result>
}
export namespace IAddTournamentPaymentsUseCase {
  export type Params = {
    tournamentId: string
    value: string
    indexPayment: string
  }
  export type Result = TournamentPaymentsModel
}
