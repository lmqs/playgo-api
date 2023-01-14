import { TournamentModel } from '../../../../../domain/models/tournament'

export interface LoadTournamentByDescriptionAndIdRepository {
  loadByDescriptionAndId: (description: string, id: string) => Promise<TournamentModel | undefined>
}
