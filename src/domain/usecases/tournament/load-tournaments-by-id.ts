import { TournamentModel } from '@/domain/models/tournament'

export interface LoadTournamentById {
  load: (id: string) => Promise<LoadTournamentById.Result | undefined>
}

export namespace LoadTournamentById {
  export type Result = TournamentModel
}
