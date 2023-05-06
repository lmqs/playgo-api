import { TournamentModel } from '@/domain/models/tournament'
export interface LoadTournamentsRepository {
  loadAll: () => Promise<LoadTournamentsRepository.Result | undefined>
}
export namespace LoadTournamentsRepository {
  export type Result = TournamentModel[]
}
