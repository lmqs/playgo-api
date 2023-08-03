import { TournamentSponsorModel } from '@/domain/models/tournament_sponsor'

export type InputDbTournamentSponsorModel = {
  tournamentId: string
  name: string
  photo?: string
  otherInformation?: string
  deleted?: boolean
}

export type OutputDbTournamentSponsorModel = {
  id: string
  name: string
  photo?: string
  tournament_id: string
  other_information?: string
  deleted?: boolean
}

// export type OutputDbTournamentSponsorModel = TournamentSponsorModel

export const dbModelToDataModelMapTournamentSponsor = (dbTournamentSponsor: OutputDbTournamentSponsorModel): TournamentSponsorModel => {
  return (
    dbTournamentSponsor && {
      id: dbTournamentSponsor.id,
      name: dbTournamentSponsor.name,
      photo: dbTournamentSponsor.photo,
      tournamentId: dbTournamentSponsor.tournament_id,
      otherInformation: dbTournamentSponsor.other_information,
      deleted: dbTournamentSponsor.deleted
    }
  )
}
