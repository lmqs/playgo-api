import { DateHandler } from '@/helpers/date-handler'

describe('DateHandler', () => {
  describe('fullDate', () => {
    test('should return the formatted date correctly when startDate and time are provided', () => {
      const dateHandler = new DateHandler()

      const startDate = new Date('2023-08-03T12:30:00')
      const result = dateHandler.fullDate({ startDate })
      expect(result).toBe('Quinta-feira, 3 de Agosto de 2023')
    })

    test('should return the formatted date correctly when only the date string is provided', () => {
      const dateHandler = new DateHandler()

      const startDateString = '03/08/2023'
      const result = dateHandler.fullDate({ startDateString })
      expect(result).toBe('Quinta-feira, 3 de Agosto de 2023')
    })

    test('should return an empty string when no date or date string is provided', () => {
      const dateHandler = new DateHandler()

      const result = dateHandler.fullDate({ startDate: undefined, startDateString: undefined })
      expect(result).toBe('')
    })

    test('should use the provided date and ignore the date string if both are provided', () => {
      const dateHandler = new DateHandler()

      const startDate = new Date('2023-08-03T12:30:00')
      const startDateString = '2022-07-15'
      const result = dateHandler.fullDate({ startDate, startDateString })
      expect(result).toBe('Quinta-feira, 3 de Agosto de 2023')
    })
  })
  describe('formatDateToString', () => {
    test('should return the date in the default format (DD/MM/YYYY)', () => {
      const dateHandler = new DateHandler()

      const inputDate = new Date('2023-08-03T12:30:00')
      const result = dateHandler.formatDateToString({ input: inputDate })
      expect(result).toBe('03/08/2023')
    })

    test('should return the date in the specified format (MM/DD/YYYY)', () => {
      const dateHandler = new DateHandler()

      const inputDate = new Date('2023-08-03T12:30:00')
      const result = dateHandler.formatDateToString({ input: inputDate, format: 'MM/DD/YYYY' })
      expect(result).toBe('08/03/2023')
    })

    test('should handle input date in different timezones', () => {
      const dateHandler = new DateHandler()

      const inputDate = new Date('2023-08-03T12:30:00Z') // UTC timezone
      const result = dateHandler.formatDateToString({ input: inputDate })
      expect(result).toBe('03/08/2023')
    })
  })
})
