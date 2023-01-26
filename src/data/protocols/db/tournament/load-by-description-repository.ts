import { TournamentModel } from '../../../../domain/models/tournament'

export interface LoadTournamentByDescriptionRepository {
  loadByDescription: (description: string) => Promise<TournamentModel | undefined>
}
