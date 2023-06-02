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
