import { TournamentSponsorModel } from '@/domain/models/tournament_sponsor'
import { AddTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'

export const requestAddTournamentSponsorControllerMock: AddTournamentSponsorController.Request = {
  tournamentId: 'valid_tournament',
  name: 'valid_name'
}

export const tournamentSponsorMock: TournamentSponsorModel = {
  id: 'valid_id',
  tournamentId: 'valid_tournament',
  name: 'valid_name',
  photo: undefined,
  otherInformation: undefined,
  deleted: true
}
