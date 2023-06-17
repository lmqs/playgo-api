import { TournamentSponsorModel } from '@/domain/models/tournament_sponsor'
export interface IAddTournamentSponsor {
  add: (data: IAddTournamentSponsor.Params) => Promise<IAddTournamentSponsor.Result>
}
export namespace IAddTournamentSponsor {
  export type Params = {
    tournamentId: string
    name: string
    photo?: string
    otherInformation?: string
  }
  export type Result = TournamentSponsorModel
}
