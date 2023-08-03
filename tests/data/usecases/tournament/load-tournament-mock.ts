import { ITournamentRepository } from '@/data/protocols/db/tournament-repository'
import { CityModel } from '@/domain/models/city'
import { SportModel } from '@/domain/models/sport'
import { LoadTournaments } from '@/domain/usecases/tournament'

export const cityModelMock: CityModel = {
  id: '1',
  name: 'Aracaju',
  codeIbge: 'any_code',
  stateId: 'any_stateId',
  gentilic: 'any_gentilic',
  deleted: true,
  area: 'any'
}

export const sportModelMock: SportModel = {
  id: '1',
  description: 'Futebol',
  deleted: false
}

export const loadTournamentsRepositoryMock: ITournamentRepository.Results =
  [{
    id: 'valid_id',
    description: 'valid_description',
    organization: 'organization',
    cityId: '1',
    sportId: '1',
    dtStartTournament: '25/06/2023',
    dtFinalTournament: '25/06/2023',
    dtStartRegistration: '25/05/2023',
    dtFinalRegistration: '25/05/2023',
    otherInformation: 'any_information',
    dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtFinalTournamentFormatted: 'Domingo, 25 de Junho de 2023',
    dtStartTournamentFormatted: 'Domingo, 25 de Junho de 2023',
    deleted: true
  },
  {
    id: 'valid_other_id',
    description: 'valid_description',
    organization: 'organization',
    cityId: '1',
    sportId: '1',
    dtStartTournament: '25/05/2023',
    dtFinalTournament: '25/05/2023',
    dtStartRegistration: '25/05/2023',
    dtFinalRegistration: '25/05/2023',
    otherInformation: 'any_information',
    dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
    dtFinalTournamentFormatted: 'Domingo, 25 de Junho de 2023',
    dtStartTournamentFormatted: 'Domingo, 25 de Junho de 2023',
    deleted: false
  }]

export const loadTournamentsModelMock: LoadTournaments.Result =
  [{
    id: 'valid_id',
    description: 'valid_description',
    organization: 'organization',
    city: {
      id: '1',
      name: 'Aracaju',
      codeIbge: 'any_code',
      stateId: 'any_stateId',
      gentilic: 'any_gentilic',
      deleted: true,
      area: 'any'
    },
    sport: {
      id: '1',
      description: 'Futebol',
      deleted: false
    },
    dtStartTournament: '25/06/2023',
    dtFinalTournament: '25/06/2023',
    dtStartRegistration: '25/05/2023',
    dtFinalRegistration: '25/05/2023',
    otherInformation: 'any_information',
    deleted: true
  },
  {
    id: 'valid_other_id',
    description: 'valid_description',
    organization: 'organization',
    city: {
      area: 'any',
      codeIbge: 'any_code',
      deleted: true,
      gentilic: 'any_gentilic',
      id: '1',
      name: 'Aracaju',
      stateId: 'any_stateId'
    },
    sport: {
      id: '1',
      description: 'Futebol',
      deleted: false
    },
    dtStartTournament: '25/05/2023',
    dtFinalTournament: '25/05/2023',
    dtStartRegistration: '25/05/2023',
    dtFinalRegistration: '25/05/2023',
    otherInformation: 'any_information',
    deleted: false
  }]
