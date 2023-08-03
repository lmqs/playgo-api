import { DateConstants } from '@/helpers/date-constants'
import moment from 'moment'
export interface IFormatDate {
  format: (input: string) => Date
  fullDate: (input: IFormatDate.fullDateParams) => string
  formatDateToString: (input: IFormatDate.formatDateToStringParams) => string
}

export namespace IFormatDate {
  export type fullDateParams = {
    startDate?: Date
    startDateString?: string
  }
  export type formatDateToStringParams = {
    input: Date
    format?: string
  }
}

export class DateHandler implements IFormatDate {
  format (input: string): Date {
    const dateFormatted = moment(input.toString(), 'DD/MM/YYYY')
    const dateFormattedUTC = moment.utc(dateFormatted).toDate()
    return dateFormattedUTC
  }

  formatDateToString ({ input, format = 'DD/MM/YYYY' }: IFormatDate.formatDateToStringParams): string {
    return moment.utc(input).utcOffset('-03:00').format(format)
  }

  fullDate ({ startDate, startDateString }: IFormatDate.fullDateParams): string {
    const startDateTemp = startDate ?? (startDateString && this.format(startDateString))
    if (!startDateTemp) return ''

    const day = DateConstants.WEEK_DAYS[startDateTemp.getDay()]
    const month = DateConstants.MONTHS[startDateTemp.getMonth()]
    return `${day}, ${startDateTemp.getDate()} de ${month} de ${startDateTemp.getFullYear()}`
  }
}
