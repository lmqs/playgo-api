import { AddTournamentController } from './tournament'

export const requestAddTournamentControllerMock: AddTournamentController.Request = {
  description: 'valid_description',
  organization: 'organization',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/05/2023',
  dtFinalTournament: '25/05/2023',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023',
  otherInformation: 'any_information'
}

export const tournamentObjectDefaultMock = {
  id: 'valid_id',
  description: 'valid_description',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/05/2023',
  dtFinalTournament: '25/05/2023',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023',
  otherInformation: 'any_information',
  organization: 'organization',
  deleted: true
}
