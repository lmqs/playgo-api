import { DateConstants } from '@/helpers/date-constants'
import moment from 'moment'
export interface FormatDate {
  format: (input: string) => Date
  fullDate: (input: FormatDate.fullDateParams) => string
}

export namespace FormatDate {
  export type fullDateParams = {
    startDate?: Date
    startDateString?: string
  }

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

  fullDate ({ startDate, startDateString }: FormatDate.fullDateParams): string {
    const startDateTemp = startDate ?? (startDateString && this.format(startDateString))
    if (!startDateTemp) return ''

    const day = DateConstants.WEEK_DAYS[startDateTemp.getDay()]
    const month = DateConstants.MONTHS[startDateTemp.getMonth()]
    return `${day}, ${startDateTemp.getDate()} de ${month} de ${startDateTemp.getFullYear()}`
  }
}
