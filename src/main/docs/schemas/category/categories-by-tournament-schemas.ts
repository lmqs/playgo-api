export const categoriesByTournamentIdSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/categoryByTournamentIdSchema'
  }
}
