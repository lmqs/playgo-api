import moment from 'moment'
export interface FormatDate {
  format: (input: String) => Date
}

export class DateHandler implements FormatDate {
  format (input: String): Date {
    const dateFormatted = moment(input.toString(), 'DD/MM/YYYY')
    const dateFormattedUTC = moment.utc(dateFormatted).toDate()
    return dateFormattedUTC
  }

  formatDateToString (input: Date): String {
    return moment.utc(input).utcOffset('-03:00').format('DD/MM/YYYY')
  }
}
