import { LoadTournamentById } from '@/domain/usecases/tournament'
import { TournamentDatabaseValidation } from '@/infra/validation/database'
import { makeDbLoadTournamentById } from '@/main/factories/usecases/tournament'
import { InvalidParamError } from '@/presentation/errors'

describe('TournamentDatabaseValidation  UseCase', () => {
  let dbLoadTournamentIdStub: LoadTournamentById
  beforeEach(() => {
    dbLoadTournamentIdStub = makeDbLoadTournamentById()
  })

  test('Should return undefined if load return tournament valid', async () => {
    jest.spyOn(dbLoadTournamentIdStub, 'load').mockResolvedValueOnce({
      id: 'valid_id',
      description: 'valid_description',
      organization: 'organization',
      cityId: 'valid_city',
      sportId: 'valid_sportId',
      otherInformation: 'any_information',
      dtStartTournament: '25/06/2023',
      dtFinalTournament: '25/06/2023',
      dtStartRegistration: '25/05/2023',
      dtFinalRegistration: '25/05/2023',
      dtFinalRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
      dtStartRegistrationFormatted: 'Quinta-feira, 25 de Maio de 2023',
      dtFinalTournamentFormatted: 'Domingo, 25 de Junho de 2023',
      dtStartTournamentFormatted: 'Domingo, 25 de Junho de 2023',
      deleted: false
    })
    const validation = new TournamentDatabaseValidation(dbLoadTournamentIdStub, 'id')
    const result = await validation.validate({ id: '1' })
    expect(result).toBeUndefined()
    expect(dbLoadTournamentIdStub.load).toHaveBeenCalledWith('1')
  })

  test('Should return InvalidParamError if load return undefined', async () => {
    jest.spyOn(dbLoadTournamentIdStub, 'load').mockResolvedValueOnce(undefined)
    const validation = new TournamentDatabaseValidation(dbLoadTournamentIdStub, 'id')

    const result = await validation.validate({ id: '1' })
    expect(result).toEqual(new InvalidParamError('id'))
    expect(dbLoadTournamentIdStub.load).toHaveBeenCalledWith('1')
  })

  test('Should throw if load throws', async () => {
    jest.spyOn(dbLoadTournamentIdStub, 'load').mockImplementation(() => {
      throw new Error()
    })
    const validation = new TournamentDatabaseValidation(dbLoadTournamentIdStub, 'id')
    const promise = validation.validate({ id: '1' })
    await expect(promise).rejects.toThrow()
  })
})
