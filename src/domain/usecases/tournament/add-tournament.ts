import { TournamentModel } from '@/domain/models/tournament'
export interface AddTournament {
  add: (data: AddTournament.Params) => Promise<AddTournament.Result | undefined>
}
export namespace AddTournament {
  export type Params = {
    description: string
    organization: string
    cityId: string
    sportId: string
    dtStartTournament: String
    dtFinalTournament: String
    dtStartRegistration: String
    dtFinalRegistration: String
    otherInformation?: string
  }
  export type Result = TournamentModel
}
