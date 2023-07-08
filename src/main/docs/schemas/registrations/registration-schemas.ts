export const registrationSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    isPay: {
      type: 'boolean'
    },
    registrationsId: {
      type: 'string'
    },
    deleted: {
      type: 'boolean'
    },
    canDelete: {
      type: 'boolean'
    },
    athlete: {
      type: 'object',
      properties: {
        id: {
          type: 'string'
        },
        name: {
          type: 'string'
        }
      }
    }
  }
}
