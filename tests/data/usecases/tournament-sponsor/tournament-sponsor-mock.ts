import { ITournamentSponsorRepository } from '@/data/protocols/db'
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

export const updateParamsModelMock: ITournamentSponsorRepository.UpdateParams = {
  id: '1',
  tournamentId: '1',
  name: 'camel sport',
  photo: undefined,
  otherInformation: undefined
}

export const updateResultModelMock: ITournamentSponsorRepository.Result = {
  id: '1',
  tournamentId: '1',
  name: 'camel sport',
  photo: undefined,
  otherInformation: undefined,
  deleted: false
}
