import { mockTournamentModel } from '@/tests/domain/mocks'
import { AddTournamentRepository } from '../protocols/db/tournament'
import { AddTournamentParams, TournamentModel } from '../usescases/tournament/add-tournament/db-add-tournament-protocols'

export const mockAddTournamentRepository = (): AddTournamentRepository => {
  class AddTournamentRepositoryStub implements AddTournamentRepository {
    async add (data: AddTournamentParams): Promise<TournamentModel> {
      return mockTournamentModel()
    }
  }
  return new AddTournamentRepositoryStub()
}
