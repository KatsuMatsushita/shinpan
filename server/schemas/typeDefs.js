const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
      # _id is required, username is required, email, bookCount, and savedBooks 
    _id: ID!
    username: String!
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Player {
    firstName: String!
    lastName: String!
    gender: String!
    club: String
    age: Int
    rank: String
    fedID: String
  }

  type Tournament {
    name: String!
    brackets: []
    participants: [Player]
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