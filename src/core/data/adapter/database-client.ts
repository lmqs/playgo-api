export interface DatabaseClient {
  exec(query: string): Promise<any>
}
