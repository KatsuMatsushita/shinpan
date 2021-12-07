const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
      # _id is required, username is required, email 
    _id: ID!
    username: String!
    email: String
    tournList: [String]
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

  input PlayerInput {
    firstName: String!
    lastName: String!
    gender: String!
    club: String
    age: Int!
    rank: String
    fedID: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPlayer(participantData: PlayerInput!, tournamentName: String!): Tournament
  }
`;

/*
graphQL queries for testing
mutation AddPlayer($participantData: PlayerInput!, $tournamentName: String!) {
  addPlayer(participantData: $participantData, tournamentName: $tournamentName) {
    name
  }
}
Variables:
{  "participantData": {
    "firstName": "Yvonne",
    "lastName": "Tester",
    "gender": "F",
    "club": "NYU Kendo",
    "age": 20,
    "rank": "0",
    "fedID": "1234"
  },
  "tournamentName": "RIT Annual 2022"
}

*/


module.exports = typeDefs;