export const accountSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    gender: {
      type: 'string',
      example: 'F/M',
      enum: ['F', 'M']
    },
    email: {
      type: 'string'
    },
    cityId: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string'
    },
    photo: {
      type: 'string'
    },
    dateBirthday: {
      type: 'string',
      example: '20/10/2020'
    }
  }
}
