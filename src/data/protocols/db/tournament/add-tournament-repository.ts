import { AddTournamentParams } from '../../../../domain/usecases/tournament/add-tournament'
import { TournamentModel } from '../../../../domain/models/tournament'

export interface AddTournamentRepository {
  add: (data: AddTournamentParams) => Promise<TournamentModel>
}
