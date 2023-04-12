import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    login(user: String!, password:String!): Account!
  }

  type Account {
    accessToken: String!
    name: String!
  }
`
