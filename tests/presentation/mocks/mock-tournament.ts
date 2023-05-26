import { AddTournament } from '@/domain/usecases/tournament'
import { mockTournamentModel } from '@/tests/domain/mocks'

export const mockAddTournament = (): AddTournament => {
  class AddTournamentStub implements AddTournament {
    async add (data: AddTournament.Params): Promise<AddTournament.Result> {
      return await new Promise(resolve => { resolve(mockTournamentModel()) })
    }
  }
  return new AddTournamentStub()
}
