import { TournamentModel } from '../../../../domain/models/tournament'

export interface UpdateTournamentRepository {
  update: (data: TournamentModel) => Promise<TournamentModel | undefined>
}
