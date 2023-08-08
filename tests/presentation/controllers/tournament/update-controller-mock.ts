import { UpdateTournamentController } from '.'

export const requestUpdateMock: UpdateTournamentController.Request = {
  id: '1',
  description: 'valid_description',
  organization: 'organization',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/06/2023',
  dtFinalTournament: '25/06/2023',
  otherInformation: 'any_information',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023'
}

export const tournamentModelMock = {
  id: '1',
  description: 'valid_description',
  organization: 'organization',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/06/2023',
  dtFinalTournament: '25/06/2023',
  otherInformation: 'any_information',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023',
  dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtFinalTournamentFormatted: 'Domingo, 25 de Junho de 2023',
  dtStartTournamentFormatted: 'Domingo, 25 de Junho de 2023',
  deleted: false
}
