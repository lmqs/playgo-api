import moment from 'moment'
export interface FormatDate {
  format: (input: String) => Date
}

export class DateHandler implements FormatDate {
  format (input: String): Date {
    const dateFormatted = moment(input.toString(), 'DD/MM/YYYY').format('YYYY-MM-DD')
    return new Date(dateFormatted)
  }

  formatDateToString (input: Date): String {
    return moment(input).format('DD/MM/YYYY')
  }
}
