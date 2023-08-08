import { ILoadByIdTournamentSponsor } from '@/domain/usecases/tournament-sponsor'
import { TournamentSponsorDatabaseValidation } from '@/infra/validation/database'
import { makeLoadTournamentSponsorById } from '@/main/factories/usecases/tournament-sponsor'
import { InvalidParamError } from '@/presentation/errors'

describe('TournamentSponsorDatabaseValidation  UseCase', () => {
  let dbLoadTournamentSponsorIdStub: ILoadByIdTournamentSponsor
  beforeEach(() => {
    dbLoadTournamentSponsorIdStub = makeLoadTournamentSponsorById()
  })

  test('Should return undefined if loadById return tournament-sponsor valid', async () => {
    jest.spyOn(dbLoadTournamentSponsorIdStub, 'loadById').mockResolvedValueOnce({
      id: '1',
      tournamentId: '2',
      name: 'name'
    })
    const validation = new TournamentSponsorDatabaseValidation(dbLoadTournamentSponsorIdStub, 'id')
    const result = await validation.validate({ id: '1' })
    expect(result).toBeUndefined()
    expect(dbLoadTournamentSponsorIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should return InvalidParamError if loadById return undefined', async () => {
    jest.spyOn(dbLoadTournamentSponsorIdStub, 'loadById').mockResolvedValueOnce(undefined)
    const validation = new TournamentSponsorDatabaseValidation(dbLoadTournamentSponsorIdStub, 'id')

    const result = await validation.validate({ id: '1' })
    expect(result).toEqual(new InvalidParamError('id'))
    expect(dbLoadTournamentSponsorIdStub.loadById).toHaveBeenCalledWith('1')
  })

  test('Should throw if loadById throws', async () => {
    jest.spyOn(dbLoadTournamentSponsorIdStub, 'loadById').mockImplementation(() => {
      throw new Error()
    })
    const validation = new TournamentSponsorDatabaseValidation(dbLoadTournamentSponsorIdStub, 'id')
    const promise = validation.validate({ id: '1' })
    await expect(promise).rejects.toThrow()
  })
})
