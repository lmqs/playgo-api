import { OutputDbTournamentSponsorModel } from '@/data/models/db-tournament-sponsor'

export const addTournamentSponsorModelMock = {
  tournamentId: 'valid_tournament',
  name: 'valid_name'
}

export const dbAddTournamentSponsorModelMock: OutputDbTournamentSponsorModel = {
  id: '1',
  tournament_id: 'valid_tournament',
  name: 'valid_name',
  photo: undefined,
  other_information: undefined,
  deleted: true
}
