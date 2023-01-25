import { TournamentModel } from '../../models/tournament'

export interface LoadTournamentById {
  load: (id: string) => Promise<TournamentModel | undefined>
}
