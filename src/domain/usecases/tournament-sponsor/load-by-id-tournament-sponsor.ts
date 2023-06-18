import { TournamentSponsorModel } from '@/domain/models/tournament_sponsor'
export interface ILoadByIdTournamentSponsor {
  loadById: (id: string) => Promise<ILoadByIdTournamentSponsor.Result | undefined>
}
export namespace ILoadByIdTournamentSponsor {
  export type Result = TournamentSponsorModel
}
