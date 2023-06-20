export const categorySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
      type: 'string'
    },
    deleted: {
      type: 'boolean'
    }
  },
  required: ['id', 'description', 'tournamentId', 'numberAthletes', 'numberAthletesRegistration']
}
