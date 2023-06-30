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
    dtStartTournament: string
    dtFinalTournament: string
    dtStartRegistration: string
    dtFinalRegistration: string
    otherInformation?: string
  }
  export type Result = TournamentModel
}
