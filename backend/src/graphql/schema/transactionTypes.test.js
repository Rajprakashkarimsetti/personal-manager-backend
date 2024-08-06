const { makeExecutableSchema } = require('@graphql-tools/schema');
const { parse, validate } = require('graphql');
const transactionTypes = require('./transactionTypes');

// Build schema from the transactionTypes file
const schema = makeExecutableSchema({ typeDefs: transactionTypes });

// Sample queries and mutations for testing
const queries = `
  query {
    getTransactions {
      id
      title
      category
      amount
      date
    }
    getTransaction(id: "1") {
      id
      title
      category
      amount
      date
    }
  }
`;

const mutations = `
  mutation {
    addTransaction(amount: 50.0, description: "Groceries", date: "2024-08-01", category: "Food", type: INCOME) {
      id
      title
      category
      amount
      date
    }
    deleteTransaction(id: "1") {
      id
      title
      category
      amount
      date
    }
  }
`;

describe('Transaction Types Schema', () => {
  it('should define Transaction type with correct fields', () => {
    const transactionType = schema.getType('Transaction');
    
    expect(transactionType).toBeDefined();
    
    const fields = transactionType.getFields();
    expect(fields).toHaveProperty('id');
    expect(fields).toHaveProperty('title');
    expect(fields).toHaveProperty('category');
    expect(fields).toHaveProperty('amount');
    expect(fields).toHaveProperty('date');
  });

  it('should define Query type with correct fields', () => {
    const queryType = schema.getType('Query');

    expect(queryType).toBeDefined();

    const fields = queryType.getFields();
    expect(fields).toHaveProperty('getTransactions');
    expect(fields).toHaveProperty('getTransaction');
  });

  it('should define Mutation type with correct fields', () => {
    const mutationType = schema.getType('Mutation');

    expect(mutationType).toBeDefined();

    const fields = mutationType.getFields();
    expect(fields).toHaveProperty('addTransaction');
    expect(fields).toHaveProperty('deleteTransaction');
  });

  it('should validate the Query and Mutation definitions', () => {
    const queryAst = parse(queries);
    const mutationAst = parse(mutations);

    const queryValidation = validate(schema, queryAst);
    const mutationValidation = validate(schema, mutationAst);

    expect(queryValidation).toHaveLength(0);
    expect(mutationValidation).toHaveLength(0);
  });
});
