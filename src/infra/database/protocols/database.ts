export interface Reader<U> {
  findOne: (field: string, value: string) => Promise<U>
  findGeneric: (whereFieldsAndValues: any) => Promise<U[]>
}

export interface Writer<T, U> {
  create: (item: T) => Promise<U>
  update: (item: any, whereFields: any) => Promise<U>
}
