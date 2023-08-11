import { IAddTournamentPaymentsUseCase, ILoadAllTournamentPaymentsUseCase } from '@/domain/usecases/tournament-payments'
import { AddTournamentPaymentsController } from '@/presentation/controllers/tournament-payments/add'
import { RemoveTournamentPaymentsController } from './remove'

export const addRequestMock: AddTournamentPaymentsController.Request = {
  tournamentId: '1',
  value: '100',
  indexPayment: '1'
}

export const addModelMock: IAddTournamentPaymentsUseCase.Result = {
  id: '1',
  tournamentId: '1',
  value: '100',
  indexPayment: '1'
}

export const loadAllModelMock: ILoadAllTournamentPaymentsUseCase.Result = [{
  id: '1',
  tournamentId: '1',
  value: '100',
  indexPayment: '1'
}]

export const removeRequestMock: RemoveTournamentPaymentsController.Request = {
  id: '1'
}
