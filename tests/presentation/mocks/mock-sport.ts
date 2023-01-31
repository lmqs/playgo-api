import { AddSport } from '@/presentation/controllers/sport'
import { mockSportModel } from '@/tests/domain/mocks/mock-sport'

export const mockAddSportStub = (): AddSport => {
  class AddSportStub implements AddSport {
    async add (data: AddSport.Params): Promise<AddSport.Result> {
      return await new Promise(resolve => { resolve(mockSportModel()) })
    }
  }
  return new AddSportStub()
}
