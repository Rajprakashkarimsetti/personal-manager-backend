const { gql } = require('apollo-server-express');

const transactionTypes = gql`
  enum TransactionType {
    INCOME
    EXPENSE
  }

  type Transaction {
    id: ID!
    title: String!
    category: String!
    amount: Float!
    date: String!
    type: TransactionType!
  }

  type Query {
    getTransactions: [Transaction!]
    getTransaction(id: ID!): Transaction
  }

  type Mutation {
    addTransaction(amount: Float!, description: String!, date: String!, category: String!, type: TransactionType!): Transaction!
    deleteTransaction(id: ID!): Transaction!
    updateTransaction(id: ID!, amount: Float!, description: String!, date: String!, category: String!, type: TransactionType!): Transaction!
  }
`;

module.exports = transactionTypes;
