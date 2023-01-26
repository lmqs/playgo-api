import { TournamentModel } from '../../../../domain/models/tournament'

export interface UpdateTournamentRepository {
  updateTournament: (data: TournamentModel) => Promise<TournamentModel>
}
