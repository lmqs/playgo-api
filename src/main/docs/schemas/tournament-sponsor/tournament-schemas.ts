export const tournamentSponsorSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
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
    },
    deleted: {
      type: 'boolean'
    }
  },
  required: ['id', 'name', 'tournamentId', 'photo', 'otherInformation']
}
