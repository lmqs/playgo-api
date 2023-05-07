export const tournamentSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    sportId: {
      type: 'string'
    },
    cityId: {
      type: 'string'
    },
    dtTournament: {
      type: 'string'
    },
    registrationStartDate: {
      type: 'string'
    },
    registrationFinalDate: {
      type: 'string'
    },
    deleted: {
      type: 'boolean'
    }
  },
  required: ['id', 'description', 'sportId', 'cityId', 'dtTournament', 'registrationStartDate', 'registrationFinalDate']
}
