import { TournamentModel } from '../../../../domain/models/tournament'

export interface LoadTournamentByIdRepository {
  loadById: (id: string) => Promise<TournamentModel | undefined>
}
