import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'
import { OutputDBTournamentPayments } from '../model/tournament-payments'

export const addParamsMock: ITournamentPaymentsRepository.AddParams = {
  tournamentId: '1',
  value: '120',
  indexPayment: '1'
}

export const outputDbMock: OutputDBTournamentPayments = {
  id: '1',
  tournament_id: '1',
  value: '120',
  index_payment: '1'
}

export const outputMock: ITournamentPaymentsRepository.Result = {
  id: '1',
  tournamentId: '1',
  value: '120',
  indexPayment: '1'
}

export const outputListDbMock: OutputDBTournamentPayments[] = [
  {
    id: '1',
    tournament_id: '1',
    value: '120',
    index_payment: '1'
  }, {
    id: '2',
    tournament_id: '1',
    value: '120',
    index_payment: '2'
  }
]

export const outputListMock: ITournamentPaymentsRepository.Results = [
  {
    id: '1',
    tournamentId: '1',
    value: '120',
    indexPayment: '1'
  }, {
    id: '2',
    tournamentId: '1',
    value: '120',
    indexPayment: '2'
  }
]
