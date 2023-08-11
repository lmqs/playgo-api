import { ITournamentPaymentsRepository } from '@/data/protocols/db/tournament-payments-repository'

export type InputDBTournamentPayments = {
  id?: string
  tournament_id: string
  value: string
  index_payment: string
}

export type OutputDBTournamentPayments = {
  id: string
  tournament_id: string
  value: string
  index_payment: string
}

export const mapDataToDbAdd = (data: ITournamentPaymentsRepository.AddParams): InputDBTournamentPayments => {
  return {
    tournament_id: data.tournamentId,
    value: data.value,
    index_payment: data.indexPayment
  }
}

export const mapDbToData = (data: OutputDBTournamentPayments): ITournamentPaymentsRepository.Result => {
  return data && {
    id: data.id,
    tournamentId: data.tournament_id,
    value: data.value,
    indexPayment: data.index_payment
  }
}

export const mapCollectionDbToData = (dataArray: OutputDBTournamentPayments[]): ITournamentPaymentsRepository.Result[] => {
  return dataArray.map((model) => {
    return mapDbToData(model)
  })
}
