// src/graphql/schema/typeDefs.test.js
const { buildSchema, parse, validate } = require('graphql');
const { gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs');

// Create schema from the type definitions
const schema = buildSchema(typeDefs.loc.source.body);

// Sample queries and mutations for testing
const queries = gql`
  query {
    getUser(id: "1") {
      id
      name
      email
    }
    getAllTransactions {
      id
      amount
      category
      description
      date
      type
    }
    financeSummary {
      totalIncome
      totalExpenses
      balance
      category
    }
    getTransactionById(id: "1") {
      id
      amount
      category
      description
      date
      type
    }
  }
`;

const mutations = gql`
  mutation {
    login(email: "test@example.com", password: "password") {
      token
      user {
        id
        name
        email
      }
    }
    register(name: "Test User", email: "test@example.com", password: "password") {
      token
      user {
        id
        name
        email
      }
    }
    createTransaction(amount: 100.0, category: "Salary", description: "Monthly Salary", date: "2024-08-01", type: INCOME) {
      id
      amount
      category
      description
      date
      type
    }
    deleteTransaction(id: "1") {
      id
    }
    updateTransaction(id: "1", amount: 150.0, category: "Bonus", description: "Yearly Bonus", date: "2024-12-31", type: INCOME) {
      id
      amount
      category
      description
      date
      type
    }
    getTransactionById(id: "1") {
      id
      amount
      category
      description
      date
      type
    }
  }
`;

describe('TypeDefs Schema', () => {
  it('should define Query type with correct fields', () => {
    const queryType = schema.getType('Query');

    expect(queryType).toBeDefined();

    const fields = queryType.getFields();
    expect(fields).toHaveProperty('getUser');
    expect(fields).toHaveProperty('getAllTransactions');
    expect(fields).toHaveProperty('financeSummary');
    expect(fields).toHaveProperty('getTransactionById');
  });

  it('should define Mutation type with correct fields', () => {
    const mutationType = schema.getType('Mutation');

    expect(mutationType).toBeDefined();

    const fields = mutationType.getFields();
    expect(fields).toHaveProperty('login');
    expect(fields).toHaveProperty('register');
    expect(fields).toHaveProperty('createTransaction');
    expect(fields).toHaveProperty('deleteTransaction');
    expect(fields).toHaveProperty('updateTransaction');
    expect(fields).toHaveProperty('getTransactionById');
  });

  it('should define AuthPayload type with correct fields', () => {
    const authPayloadType = schema.getType('AuthPayload');

    expect(authPayloadType).toBeDefined();

    const fields = authPayloadType.getFields();
    expect(fields).toHaveProperty('token');
    expect(fields).toHaveProperty('user');
  });

  it('should define User type with correct fields', () => {
    const userType = schema.getType('User');

    expect(userType).toBeDefined();

    const fields = userType.getFields();
    expect(fields).toHaveProperty('id');
    expect(fields).toHaveProperty('name');
    expect(fields).toHaveProperty('email');
  });

  it('should define Transaction type with correct fields', () => {
    const transactionType = schema.getType('Transaction');

    expect(transactionType).toBeDefined();

    const fields = transactionType.getFields();
    expect(fields).toHaveProperty('id');
    expect(fields).toHaveProperty('amount');
    expect(fields).toHaveProperty('category');
    expect(fields).toHaveProperty('description');
    expect(fields).toHaveProperty('date');
    expect(fields).toHaveProperty('type');
  });

  it('should define FinanceSummary type with correct fields', () => {
    const financeSummaryType = schema.getType('FinanceSummary');

    expect(financeSummaryType).toBeDefined();

    const fields = financeSummaryType.getFields();
    expect(fields).toHaveProperty('totalIncome');
    expect(fields).toHaveProperty('totalExpenses');
    expect(fields).toHaveProperty('balance');
    expect(fields).toHaveProperty('category');
  });

  it('should define TransactionResponse type with correct fields', () => {
    const transactionResponseType = schema.getType('TransactionResponse');

    expect(transactionResponseType).toBeDefined();

    const fields = transactionResponseType.getFields();
    expect(fields).toHaveProperty('id');
  });

  it('should validate the Query and Mutation definitions', () => {
    const queryAst = parse(queries.loc.source.body);
    const mutationAst = parse(mutations.loc.source.body);

    const queryValidation = validate(schema, queryAst);
    const mutationValidation = validate(schema, mutationAst);

    expect(queryValidation).toHaveLength(0);
    expect(mutationValidation).toHaveLength(0);
  });
});
