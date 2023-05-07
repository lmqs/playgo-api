export const tournamentsSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/tournament'
  }
}
