import { TournamentSponsorModel } from '@/domain/models/tournament_sponsor'
export interface IUpdateTournamentSponsor {
  update: (data: IUpdateTournamentSponsor.Params) => Promise<IUpdateTournamentSponsor.Result>
}
export namespace IUpdateTournamentSponsor {
  export type Params = {
    id: string
    tournamentId: string
    name: string
    photo?: string
    otherInformation?: string
  }
  export type Result = TournamentSponsorModel
}
