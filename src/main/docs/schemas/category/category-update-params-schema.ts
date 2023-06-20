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
    numberAthletesRegistration: {
      type: 'string',
      example: '2'
    },
    deleted: {
      type: 'boolean',
      example: 'true'
    }
  },
  required: ['description', 'tournamentId', 'numberAthletes', 'numberAthletesRegistration']
}
