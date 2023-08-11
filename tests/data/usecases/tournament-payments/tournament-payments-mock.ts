import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { IAddTournamentPaymentsUseCase, ILoadAllTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'

export const loadAllMock: ILoadAllTournamentPaymentsUseCase.Result = [
  {
    id: '1',
    tournamentId: '1',
    value: '120',
    indexPayment: '1'
  }, {
    id: '2',
    tournamentId: '1',
    value: '121',
    indexPayment: '2'
  }
]

export const addParamsMock: IAddTournamentPaymentsUseCase.Params = {
  tournamentId: '1',
  value: '120',
  indexPayment: '1'
}

export const addResultMock: IAddTournamentPaymentsUseCase.Result = {
  id: '1',
  tournamentId: '1',
  value: '120',
  indexPayment: '1'
}

export const loadByTournamentInvalidMock: ITournamentPaymentsRepository.Results = [
  {
    id: '1',
    tournamentId: '1',
    value: '120',
    indexPayment: '1'
  }, {
    id: '2',
    tournamentId: '1',
    value: '121',
    indexPayment: '2'
  }
]

export const loadByTournamentValidMock: ITournamentPaymentsRepository.Results = [
  {
    id: '1',
    tournamentId: '1',
    value: '120',
    indexPayment: '2'
  }, {
    id: '2',
    tournamentId: '1',
    value: '121',
    indexPayment: '3'
  }
]
