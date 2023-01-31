import { TournamentModel } from '@/domain/models/tournament'

export interface LoadTournaments {
  load: () => Promise<LoadTournaments.Result | undefined>
}

export namespace LoadTournaments {
  export type Result = TournamentModel[]
}
