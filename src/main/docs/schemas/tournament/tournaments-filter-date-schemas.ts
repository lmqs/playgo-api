export const tournamentsFilterDateSchema = {
  type: 'object',
  properties: {
    opened: {
      type: 'array',
      items: {
        $ref: '#/schemas/tournament'
      }
    },
    finished: {
      type: 'array',
      items: {
        $ref: '#/schemas/tournament'
      }
    }
  }

}
