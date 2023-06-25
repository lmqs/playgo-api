import { RegisterCategory } from '@/domain/models/register-category'

export interface IAddRegisterCategory {
  add: (registerCategory: IAddRegisterCategory.Params) => Promise<IAddRegisterCategory.Result>
}

export namespace IAddRegisterCategory {
  export type Params = {
    categoryId: string
    registerDate: string
  }
  export type Result = RegisterCategory
}
