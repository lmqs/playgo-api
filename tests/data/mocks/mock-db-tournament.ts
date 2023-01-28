import { mockTournamentModel } from '@/tests/domain/mocks'
import { AddTournamentRepository } from '@/data/protocols/db/tournament'
import { AddTournament } from '@/data/usescases/tournament/add-tournament/db-add-tournament-protocols'

export const mockAddTournamentRepository = (): AddTournamentRepository => {
  class AddTournamentRepositoryStub implements AddTournamentRepository {
    async add (data: AddTournament.Params): Promise<AddTournament.Result> {
      return mockTournamentModel()
    }
  }
  return new AddTournamentRepositoryStub()
}
