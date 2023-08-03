import { OutputDbRegistrationsWaiting } from '@/data/models/db-registrations-waiting'

export const registrationWaitingModelMock = {
  id: '1',
  categoryId: '1',
  date: '20/07/2023',
  deleted: false
}

export const registrationWaitingDbMock: OutputDbRegistrationsWaiting = {
  id: '1',
  category_id: '1',
  date: new Date('2023-07-20 10:00'),
  deleted: false
}
