export interface Reader<T> {
  findOne: (id: string) => Promise<T>
}

export interface Writer<T, U> {
  create: (item: T) => Promise<U>
}
