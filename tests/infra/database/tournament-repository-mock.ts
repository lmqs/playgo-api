import { OutputDbTournamentModel } from '@/data/models/tournament/db-tournament'
import { LoadTournamentByIdRepository, LoadTournamentsRepository, UpdateTournamentRepository } from '@/data/protocols/db/tournament'
import { AddTournament } from '@/domain/usecases/tournament'

export const outputDbMock: OutputDbTournamentModel = {
  id: 'valid_id',
  organization: 'organization',
  description: 'valid_description',
  city_id: 'valid_city',
  sport_id: 'valid_sportId',
  dt_start_tournament: new Date('2023-05-25 00:00:00'),
  dt_final_tournament: new Date('2023-05-25 00:00:00'),
  dt_start_registration: new Date(),
  dt_final_registration: new Date(),
  other_information: 'any_information',
  deleted: true
}

export const outputDbArrayMock: OutputDbTournamentModel[] = [outputDbMock, outputDbMock]

export const addInputMock: AddTournament.Params = {
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

export const addOutputMock: AddTournament.Result = {
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

export const loadByIdOutputMock: LoadTournamentByIdRepository.Result = {
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

export const updateInputMock: UpdateTournamentRepository.Params = {
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

export const updateOutputMock: UpdateTournamentRepository.Result = {
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

export const listAllOutputMock: LoadTournamentsRepository.Result =
[
  {
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
  },
  {
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
]
