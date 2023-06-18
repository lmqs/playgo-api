export const tournamentSponsorParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    tournamentId: {
      type: 'string'
    },
    photo: {
      type: 'string'
    },
    otherInformation: {
      type: 'string'
    }
  },
  required: ['name', 'tournamentId']
}
