import { TournamentPaymentsRepoModel } from '@/data/models/tournament-payments'

export interface ITournamentPaymentsRepository {

  add: (data: ITournamentPaymentsRepository.AddParams) => Promise<ITournamentPaymentsRepository.Result>
  load: () => Promise<ITournamentPaymentsRepository.Results>
  loadById: (id: string) => Promise<ITournamentPaymentsRepository.Result>
  loadByTournament: (tournamentId: string) => Promise<ITournamentPaymentsRepository.Results>
  remove: (id: string) => Promise<boolean>
}

export namespace ITournamentPaymentsRepository {

  export type AddParams = {
    tournamentId: string
    value: string
    indexPayment: string
  }
  export type UpdateParams = TournamentPaymentsRepoModel
  export type Results = TournamentPaymentsRepoModel[]
  export type Result = TournamentPaymentsRepoModel
}
