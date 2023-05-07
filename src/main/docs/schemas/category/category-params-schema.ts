export const categoryParamsSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string'
    },
    tournamentId: {
      type: 'string'
    },
    numberAthletes: {
      type: 'string'
    }
  },
  required: ['description', 'tournamentId', 'numberAthletes']
}
