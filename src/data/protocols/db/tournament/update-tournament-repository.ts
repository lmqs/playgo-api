import { TournamentModel } from '@/domain/models/tournament'

export interface UpdateTournamentRepository {
  updateTournament: (data: UpdateTournamentRepository.Params) => Promise<UpdateTournamentRepository.Result>
}

export namespace UpdateTournamentRepository {
  export type Params = TournamentModel
  export type Result = TournamentModel
}
