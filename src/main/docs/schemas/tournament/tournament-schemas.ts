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
      $ref: '#/schemas/sport'
    },
    cityId: {
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
    dtStartTournamentFormatted: {
      type: 'string'
    },
    dtFinalTournamentFormatted: {
      type: 'string'
    },
    dtStartRegistrationFormatted: {
      type: 'string'
    },
    dtFinalRegistrationFormatted: {
      type: 'string'
    },
    deleted: {
      type: 'boolean'
    }
  }
}
