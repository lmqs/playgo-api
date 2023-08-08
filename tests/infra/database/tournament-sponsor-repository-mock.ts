import { OutputDbTournamentSponsorModel } from '@/data/models/db-tournament-sponsor'
import { ITournamentSponsorRepository } from '@/data/protocols/db'

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

export const updateTournamentSponsorModelMock = {
  id: '1',
  tournamentId: '1',
  name: 'valid_name'
}

export const dbUpdateTournamentSponsorModelMock: OutputDbTournamentSponsorModel = {
  id: '1',
  tournament_id: '1',
  name: 'valid_name',
  photo: undefined,
  other_information: undefined,
  deleted: true
}

export const dbTournamentSponsorModelMock: ITournamentSponsorRepository.Result = {
  id: '1',
  tournamentId: '1',
  name: 'valid_name',
  photo: undefined,
  otherInformation: undefined,
  deleted: true
}
