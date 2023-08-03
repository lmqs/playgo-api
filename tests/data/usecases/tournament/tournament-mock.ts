import { AddTournament } from '@/domain/usecases/tournament'

export const addTournamentObjectMock: AddTournament.Params = {
  description: 'valid_description',
  organization: 'organization',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/05/2023',
  dtFinalTournament: '26/05/2023',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '26/05/2023',
  otherInformation: 'any_information'
}

export const dbLoadByIdMock = {
  id: 'valid_id',
  organization: 'organization',
  description: 'valid_description',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/06/2023',
  dtFinalTournament: '25/06/2023',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023',
  otherInformation: 'any_information',
  deleted: false
}

export const loadByIdTournamentObjectMock = {
  id: 'valid_id',
  description: 'valid_description',
  organization: 'organization',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  otherInformation: 'any_information',
  dtStartTournament: '25/06/2023',
  dtFinalTournament: '25/06/2023',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023',
  dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtFinalTournamentFormatted: 'Domingo, 25 de Junho de 2023',
  dtStartTournamentFormatted: 'Domingo, 25 de Junho de 2023',
  deleted: false
}
