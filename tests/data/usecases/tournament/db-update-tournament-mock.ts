import { ITournamentRepository } from '@/data/protocols/db'
import { IUpdateTournament } from '@/domain/usecases/tournament/update-tournament'

export const updateMock: IUpdateTournament.Params = {
  id: '1',
  description: 'valid_description',
  organization: 'organization',
  cityId: '1',
  sportId: '1',
  dtStartTournament: '25/07/2023',
  dtFinalTournament: '25/07/2023',
  dtStartRegistration: '25/08/2023',
  dtFinalRegistration: '25/08/2023',
  otherInformation: 'any_information'
}

export const updateRepoMock: ITournamentRepository.Result = {
  id: '1',
  description: 'valid_description',
  organization: 'organization',
  cityId: '1',
  sportId: '1',
  dtStartTournament: '25/07/2023',
  dtFinalTournament: '25/07/2023',
  dtStartRegistration: '25/08/2023',
  dtFinalRegistration: '25/08/2023',
  otherInformation: 'any_information',
  dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Julho de 2023',
  dtStartRegistrationFormatted: 'Quinta-feira, 25 de Julho de 2023',
  dtFinalTournamentFormatted: 'Domingo, 25 de Agosto de 2023',
  dtStartTournamentFormatted: 'Domingo, 25 de Agosto de 2023',
  deleted: false
}

export const listTournamentUsedMock: ITournamentRepository.Results = [{
  id: '2',
  description: 'valid_description',
  organization: 'organization',
  cityId: '1',
  sportId: '1',
  dtStartTournament: '25/07/2023',
  dtFinalTournament: '25/07/2023',
  dtStartRegistration: '25/08/2023',
  dtFinalRegistration: '25/08/2023',
  otherInformation: 'any_information',
  dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Julho de 2023',
  dtStartRegistrationFormatted: 'Quinta-feira, 25 de Julho de 2023',
  dtFinalTournamentFormatted: 'Domingo, 25 de Agosto de 2023',
  dtStartTournamentFormatted: 'Domingo, 25 de Agosto de 2023',
  deleted: false
}]

export const updateParamsInvalidDtRegistrationMock: IUpdateTournament.Params = {
  id: '1',
  description: 'valid_description',
  organization: 'organization',
  cityId: '1',
  sportId: '1',
  dtStartTournament: '25/07/2023',
  dtFinalTournament: '25/07/2023',
  dtStartRegistration: '26/08/2023',
  dtFinalRegistration: '25/08/2023',
  otherInformation: 'any_information'
}

export const updateParamsInvalidDtTournamentMock: IUpdateTournament.Params = {
  id: '1',
  description: 'valid_description',
  organization: 'organization',
  cityId: '1',
  sportId: '1',
  dtStartTournament: '29/07/2023',
  dtFinalTournament: '25/07/2023',
  dtStartRegistration: '25/08/2023',
  dtFinalRegistration: '25/08/2023',
  otherInformation: 'any_information'
}
