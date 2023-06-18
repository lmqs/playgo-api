import { IAddTournamentSponsor } from '@/domain/usecases/tournament-sponsor'

export const addParamsTournamentSponsorModelMock: IAddTournamentSponsor.Params = {
  tournamentId: 'valid_tournament',
  name: 'valid_name'
}

export const addResultTournamentSponsorModelMock: IAddTournamentSponsor.Result = {
  id: '1',
  tournamentId: 'valid_tournament',
  name: 'valid_name',
  photo: undefined,
  otherInformation: undefined,
  deleted: true
}
