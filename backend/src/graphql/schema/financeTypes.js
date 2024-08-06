const { gql } = require('apollo-server-express');

const financeTypes = gql`
  type Transaction {
    id: ID!
    title: String!
    category: String!
    amount: Float!
    date: String!
  }

  type Query {
    getTransactions: [Transaction!]
    getTransaction(id: ID!): Transaction
  }

  type Mutation {
    addTransaction(title: String!, category: [String!]!, amount: Float!, date: String!): Transaction!
    deleteTransaction(id: ID!): Transaction!
  }
`;

module.exports = financeTypes;
