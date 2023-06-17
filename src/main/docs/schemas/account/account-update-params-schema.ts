export const updateAccountParamsSchema = {
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
    password: {
      type: 'string'
    },
    role: {
      type: 'string'
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
  },
  required: ['name', 'gender', 'password', 'email', 'cityId', 'phoneNumber', 'dateBirthday']
}
