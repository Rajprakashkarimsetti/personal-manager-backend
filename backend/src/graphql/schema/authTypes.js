const { gql } = require('apollo-server-express');

const authTypes = gql`
  type Auth {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Query {
    login(username: String!, password: String!): Auth
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = authTypes;
