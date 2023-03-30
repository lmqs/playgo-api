import { TournamentModel } from '@/domain/models/tournament'
import { AddTournament } from '@/domain/usecases/tournament/add-tournament'
import { LoadTournaments } from '../usecases/tournament'

export const mockTournamentModel = (): TournamentModel => {
  return {
    id: 'valid_id',
    description: 'valid_description',
    cityId: 'valid_city',
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  }
}

export const mockAddTournamentParams = (): AddTournament.Params => {
  return {
    description: 'valid_description',
    cityId: 'valid_city',
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  }
}

export const mockTournamentsModel = (): TournamentModel[] => {
  return [{
    id: 'valid_id',
    description: 'valid_description',
    cityId: 'valid_city',
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  },
  {
    id: 'valid__other_id',
    description: 'valid_description',
    cityId: 'valid_city',
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  }]
}

export const mockLoadTournamentsModel = (): LoadTournaments.Result => {
  return [{
    id: 'valid_id',
    description: 'valid_description',
    cityId: {
      id: 'valid_id',
      name: 'valid_city',
      codeIbge: 'valid_code',
      stateId: 'valid_state',
      gentilic: 'valid_gentilic',
      area: 'valid_area',
      deleted: false
    },
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  },
  {
    id: 'valid__other_id',
    description: 'valid_description',
    cityId: {
      id: 'valid_id',
      name: 'valid_city',
      codeIbge: 'valid_code',
      stateId: 'valid_state',
      gentilic: 'valid_gentilic',
      area: 'valid_area',
      deleted: false
    },
    sportId: 'valid_sportId',
    dtTournament: 'valid_dtTournament',
    registrationStartDate: 'valid_registrationStartDate',
    registrationFinalDate: 'valid_registrationFinalDate',
    deleted: true
  }]
}
