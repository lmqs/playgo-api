export const tournamentsSponsorSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/tournament-sponsor'
  }
}
