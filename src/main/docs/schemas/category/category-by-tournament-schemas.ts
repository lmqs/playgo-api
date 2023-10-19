export const categoryByTournamentIdSchema = {
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
    isUserLoggedRegistered: {
      type: 'boolean'
    },
    numberRegistration: {
      type: 'number'
    },
    deleted: {
      type: 'boolean'
    }
  }
}
