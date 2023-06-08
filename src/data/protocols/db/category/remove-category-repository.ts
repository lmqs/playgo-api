
export interface RemoveCategoryRepository {
  remove: (id: string) => Promise<void>
}
