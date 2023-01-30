export const tournamentParamsSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string'
    },
    cityId: {
      type: 'string'
    },
    sportId: {
      type: 'string'
    },
    dtTournament: {
      type: 'string'
    },
    registrationLimit: {
      type: 'number'
    },
    registrationStartDate: {
      type: 'string'
    },
    registrationFinalDate: {
      type: 'string'
    }
  },
  required: ['description', 'cityId', 'sportId', 'dtTournament', 'registrationLimit', 'registrationStartDate', 'registrationFinalDate']
}
