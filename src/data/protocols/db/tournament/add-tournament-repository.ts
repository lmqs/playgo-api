import { SaveTournamentModel } from 'domain/usecases/tournament/save-tournament'
import { TournamentModel } from '../../../../domain/models/tournament'

export interface AddTournamentRepository {
  add: (data: SaveTournamentModel) => Promise<TournamentModel>
}
