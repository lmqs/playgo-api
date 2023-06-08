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
    dtStartTournament: {
      type: 'string'
    },
    dtFinalTournament: {
      type: 'string'
    },
    dtStartRegistration: {
      type: 'string'
    },
    dtFinalRegistration: {
      type: 'string'
    },
    otherInformation: {
      type: 'string'
    },
    organization: {
      type: 'string'
    }
  },
  required: [
    'description',
    'cityId',
    'sportId',
    'dtStartTournament',
    'dtFinalTournament',
    'dtStartRegistration',
    'dtFinalRegistration'
  ]
}
