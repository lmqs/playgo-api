export const registrationsByCategorySchema = {
  type: 'array',
  items: {
    properties: {
      id: {
        type: 'string'
      },
      athletes: {
        type: 'array',
        items: {
          properties: {
            id: {
              type: 'string'
            },
            name: {
              type: 'string'
            },
            isPay: {
              type: 'boolean'
            },
            canDelete: {
              type: 'boolean'
            }
          }

        }
      }
    }
  }

}
