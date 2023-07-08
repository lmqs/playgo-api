
import { LogPostgresRepository } from '@/infra/database/postgres/log/log-repository'

describe('Log Postgres Repository', () => {
  describe('logError()', () => {
    test('Should call logError with success', async () => {
      const logRepository = new LogPostgresRepository()
      logRepository.create = jest.fn().mockReturnValue(undefined)

      await logRepository.logError('any_stack')
    })

    test('Should return undefined if logError fails', async () => {
      const logRepository = new LogPostgresRepository()
      logRepository.create = jest.fn().mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = logRepository.logError('any_stack')
      await expect(promise).rejects.toThrow()
    })
  })
})
