import { TournamentModel } from '@/domain/models/tournament'
export interface IUpdateTournament {
  update: (data: IUpdateTournament.Params) => Promise<IUpdateTournament.Result | undefined>
}
export namespace IUpdateTournament {
  export type Params = {
    id: string
    description: string
    organization: string
    cityId: string
    sportId: string
    dtStartTournament?: string
    dtFinalTournament?: string
    dtStartRegistration?: string
    dtFinalRegistration?: string
    otherInformation?: string
  }
  export type Result = TournamentModel
}
