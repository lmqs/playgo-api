import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    tournaments: [Tournament!]!
  }

  type Tournament {
    id: ID!
    description: String!
    cityId: City!
    sportId: Sport!
    dtTournament: String!
    registrationStartDate: String!
    registrationFinalDate: String!
    deleted: Boolean
  }

  type City {
    id: ID!
    name: String!
    codeIbge: String
    stateId: String!
    area: String
    gentilic: String
    deleted: Boolean
  }

  type Sport {
    id: ID!
    description: String!
    deleted: Boolean
  }
`
