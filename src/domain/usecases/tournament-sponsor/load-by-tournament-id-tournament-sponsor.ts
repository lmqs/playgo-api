import { TournamentSponsorModel } from '@/domain/models/tournament_sponsor'
export interface ILoadByTournamentIdTournamentSponsor {
  loadByTournamentId: (tournamentId: string) => Promise<ILoadByTournamentIdTournamentSponsor.Result>
}
export namespace ILoadByTournamentIdTournamentSponsor {
  export type Result = TournamentSponsorModel[]
}
