const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
      # _id is required, username is required, email 
    _id: ID!
    username: String!
    email: String
    tournaments: [Tournament]
  }

  type Player {
    idNum: String
    firstName: String!
    lastName: String!
    gender: String!
    club: String
    age: Int!
    rank: String
    fedID: String
  }

  type Tournament {
    name: String!
    brackets: [Bracket]
    participants: [Player]
  }

  type Bracket {
      name: String!
      round: Int
      match: Int
      player1: Player
      player2: Player
  }

  type Auth {
      token: ID!
      user: User
  }

  type Query {
      me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;