import { TournamentSponsorModel } from '@/domain/models/tournament_sponsor'

export interface ITournamentSponsorRepository {
  add: (data: ITournamentSponsorRepository.AddParams) => Promise<ITournamentSponsorRepository.Result>
  loadByTournamentId: (tournamentId: string) => Promise<ITournamentSponsorRepository.LoadResult>
  loadById: (id: string) => Promise<ITournamentSponsorRepository.Result | undefined>
  remove: (id: string) => Promise<void>
  updateSponsor: (data: ITournamentSponsorRepository.UpdateParams) => Promise<ITournamentSponsorRepository.Result>
}

export namespace ITournamentSponsorRepository {
  export type AddParams = {
    tournamentId: string
    name: string
    photo?: string
    otherInformation?: string
  }
  export type UpdateParams = {
    id: string
    tournamentId: string
    name: string
    photo?: string
    otherInformation?: string
  }
  export type LoadResult = TournamentSponsorModel[]
  export type Result = TournamentSponsorModel
}

export const dataModelToDbModelMapTournamentSponsor = (tournamentSponsorModel: ITournamentSponsorRepository.AddParams): any => {
  return {
    name: tournamentSponsorModel.name,
    other_information: tournamentSponsorModel.otherInformation,
    tournament_id: tournamentSponsorModel.tournamentId,
    photo: tournamentSponsorModel.photo
  }
}
