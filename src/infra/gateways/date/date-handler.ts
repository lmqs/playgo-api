import moment from 'moment'
export interface FormatDate {
  format: (input: string) => Date
}

export class DateHandler implements FormatDate {
  format (input: string): Date {
    const dateFormatted = moment(input.toString(), 'DD/MM/YYYY')
    const dateFormattedUTC = moment.utc(dateFormatted).toDate()
    return dateFormattedUTC
  }

  formatDateToString (input: Date): string {
    return moment.utc(input).utcOffset('-03:00').format('DD/MM/YYYY')
  }
}
