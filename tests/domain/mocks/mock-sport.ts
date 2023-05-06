import { SportModel } from '@/domain/models/sport'
import { AddSport } from '@/domain/usecases/sport/add-sport'
import { LoadSports } from '@/domain/usecases/sport/load-sports'

export const mockSportModel = (): SportModel => ({
  id: 'any_id',
  description: 'any_description',
  deleted: false
})

export const mockAddSportParams = (): AddSport.Params => ({
  description: 'any_description'
})

export const mockSportAllModel = (): LoadSports.Result => (
  [{
    id: 'any_id',
    description: 'any_description',
    deleted: false
  },
  {
    id: 'other_id',
    description: 'any_description',
    deleted: false
  }]
)
