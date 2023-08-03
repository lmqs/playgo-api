import { TournamentAddRepoModel } from '@/data/models/tournament/db-add-tournament'
import { TournamentRepoModel } from '@/data/models/tournament/db-tournament'

export interface ITournamentRepository {

  add: (data: ITournamentRepository.AddParams) => Promise<ITournamentRepository.Result>
  loadById: (id: string) => Promise<ITournamentRepository.Result | undefined>
  loadFilter: (filter: ITournamentRepository.LoadFilterParams) => Promise<ITournamentRepository.Results>
  loadByDescription: (description: string) => Promise<ITournamentRepository.Results>
  remove: (id: string) => Promise<void>
  updateTournament: (data: ITournamentRepository.UpdateParams) => Promise<ITournamentRepository.Result>
  loadAll: () => Promise<ITournamentRepository.Results | undefined>
}

export namespace ITournamentRepository {
  export type LoadFilterParams = {
    date: string
    operator: string
  }
  export type Result = TournamentRepoModel
  export type Results = TournamentRepoModel[]
  export type AddParams = TournamentAddRepoModel
  export type UpdateParams = {
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
    deleted?: boolean
  }
}
