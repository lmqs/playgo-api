import { AddTournamentModel } from '../../../../domain/usecases/tournament/add-tournament'
import { TournamentModel } from '../../../../domain/models/tournament'

export interface AddTournamentRepository {
  add: (data: AddTournamentModel) => Promise<TournamentModel>
}
