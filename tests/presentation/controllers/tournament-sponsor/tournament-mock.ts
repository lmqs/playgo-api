import { TournamentSponsorModel } from '@/domain/models/tournament_sponsor'
import { AddTournamentSponsorController, RemoveTournamentSponsorController } from '@/presentation/controllers/tournament-sponsor'
import { LoadCategoriesByTournamentIdController } from '../category'

export const requestAddTournamentSponsorControllerMock: AddTournamentSponsorController.Request = {
  tournamentId: 'valid_tournament',
  name: 'valid_name'
}

export const requestRemoveTournamentSponsorControllerMock: RemoveTournamentSponsorController.Request = {
  id: 'valid_id'
}

export const requestLoadByTournamentIdTournamentSponsorControllerMock: LoadCategoriesByTournamentIdController.Request = {
  tournamentId: 'valid_id'
}

export const tournamentSponsorMock: TournamentSponsorModel = {
  id: 'valid_id',
  tournamentId: 'valid_tournament',
  name: 'valid_name',
  photo: undefined,
  otherInformation: undefined,
  deleted: true
}
