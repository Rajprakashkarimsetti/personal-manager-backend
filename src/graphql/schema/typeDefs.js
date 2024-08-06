const { gql } = require('apollo-server-express');

const typeDefs = gql`
  enum TransactionType {
    INCOME
    EXPENSE
  }

  type Query {
    getUser(id: ID!): User
    getAllTransactions: [Transaction]
    financeSummary: FinanceSummary
    getTransactionById(id: ID!): Transaction
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    register(name: String!, email: String!, password: String!): AuthPayload
    createTransaction(amount: Float!, category: String!, description: String!, date: String!, type: TransactionType!): Transaction
    deleteTransaction(id: ID!): TransactionResponse
    updateTransaction(id: ID!, amount: Float, category: String, description: String, date: String, type: TransactionType): Transaction
    getTransactionById(id: ID!): Transaction
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Transaction {
    id: ID!
    amount: Float!
    category: String!
    description: String!
    date: String!
    type: TransactionType!
  }

  type FinanceSummary {
    totalIncome: Float
    totalExpenses: Float
    balance: Float
    category: [String!]
  }

  type TransactionResponse {
    id: ID!
  }
`;

module.exports = typeDefs;
