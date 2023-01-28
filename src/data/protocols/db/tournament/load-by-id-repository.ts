import { TournamentModel } from '@/domain/models/tournament'

export interface LoadTournamentByIdRepository {
  loadById: (id: string) => Promise<LoadTournamentByIdRepository.Result | undefined>
}

export namespace LoadTournamentByIdRepository {
  export type Result = TournamentModel
}
