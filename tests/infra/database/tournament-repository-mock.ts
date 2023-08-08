import { OutputDbTournamentModel } from '@/infra/model/db-tournament'
import { AddTournament } from '@/domain/usecases/tournament'
import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'

export const outputDbMock: OutputDbTournamentModel = {
  id: 'valid_id',
  organization: 'organization',
  description: 'valid_description',
  city_id: 'valid_city',
  sport_id: 'valid_sportId',
  dt_start_tournament: new Date('2023-05-25 00:00:00'),
  dt_final_tournament: new Date('2023-05-25 00:00:00'),
  dt_start_registration: new Date('2023-05-25 00:00:00'),
  dt_final_registration: new Date('2023-05-25 00:00:00'),
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

export const addOutputMock: ITournamentRepository.Result = {
  id: 'valid_id',
  description: 'valid_description',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/05/2023',
  dtFinalTournament: '25/05/2023',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023',
  dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtFinalTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtStartTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
  otherInformation: 'any_information',
  organization: 'organization',
  deleted: true
}

export const loadByIdOutputMock: ITournamentRepository.Result = {
  id: 'valid_id',
  description: 'valid_description',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  dtStartTournament: '25/05/2023',
  dtFinalTournament: '25/05/2023',
  dtStartRegistration: '25/05/2023',
  dtFinalRegistration: '25/05/2023',
  dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtFinalTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtStartTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
  otherInformation: 'any_information',
  organization: 'organization',
  deleted: true
}

export const updateInputMock: ITournamentRepository.UpdateParams = {
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

export const updateInputIncompleteMock: ITournamentRepository.UpdateParams = {
  id: 'valid_id',
  description: 'valid_description',
  cityId: 'valid_city',
  sportId: 'valid_sportId',
  otherInformation: 'any_information',
  organization: 'organization',
  deleted: true
}

export const updateInputDbIncompleteMock = {
  id: 'valid_id',
  description: 'valid_description',
  city_id: 'valid_city',
  sport_id: 'valid_sportId',
  other_information: 'any_information',
  organization: 'organization',
  dt_start_tournament: undefined,
  dt_final_tournament: undefined,
  dt_start_registration: undefined,
  dt_final_registration: undefined
}

export const updateOutputMock: ITournamentRepository.Result = {
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
  dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtFinalTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
  dtStartTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
  deleted: true
}

export const listAllOutputMock: ITournamentRepository.Results =
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
    dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtFinalTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtStartTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
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
    dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtFinalTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtStartTournamentFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtFinalRegistration: '25/05/2023',
    otherInformation: 'any_information',
    organization: 'organization',
    deleted: true
  }
]
