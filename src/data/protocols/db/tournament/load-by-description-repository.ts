import { TournamentModel } from '../../../../domain/models/tournament'

export interface LoadTournamentByDescriptionRepository {
  loadByDescription: (description: string) => Promise<LoadTournamentByDescriptionRepository.Result | undefined>
}

export namespace LoadTournamentByDescriptionRepository {
  export type Result = TournamentModel
}
