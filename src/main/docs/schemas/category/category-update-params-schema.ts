export const updateCategoryParamsSchema = {
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
    },
    deleted: {
      type: 'boolean',
      example: 'true'
    }
  },
  required: ['description', 'tournamentId', 'numberAthletes']
}
