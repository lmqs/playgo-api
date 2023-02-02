export interface RemoveTournamentRepository {
  remove: (id: string) => Promise<void>
}
