import { TournamentPaymentsModel } from '@/domain/models/tournament_payments'

export interface ILoadAllTournamentPaymentsUseCase {
  loadAll: () => Promise<ILoadAllTournamentPaymentsUseCase.Result>
}
export namespace ILoadAllTournamentPaymentsUseCase {
  export type Result = TournamentPaymentsModel[]
}
