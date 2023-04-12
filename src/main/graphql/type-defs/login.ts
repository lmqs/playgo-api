import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    login(user: String!, password:String!): Account!
  },

  extend type Mutation {
    signup(user: String!, name: String!, email: String!, password:String!, passwordConfirmation:String!, cityId: Int!, phoneNumber: String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`
