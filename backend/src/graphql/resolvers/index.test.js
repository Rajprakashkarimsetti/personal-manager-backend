// src/graphql/resolvers/index.test.js
const resolvers = require('./index');
const authResolvers = require('./authResolvers');
const financeResolvers = require('./financeResolvers');
const transactionResolvers = require('./transactionResolvers');

jest.mock('./authResolvers', () => ({
  Query: {
    login: jest.fn(),
    register: jest.fn()
  },
  Mutation: {
    login: jest.fn(),
    register: jest.fn()
  }
}));

jest.mock('./financeResolvers', () => ({
  Query: {
    financeSummary: jest.fn()
  }
}));

jest.mock('./transactionResolvers', () => ({
  Query: {
    getAllTransactions: jest.fn(),
    getTransactionById: jest.fn()
  },
  Mutation: {
    createTransaction: jest.fn(),
    deleteTransaction: jest.fn(),
    updateTransaction: jest.fn()
  }
}));

describe('Combined Resolvers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should combine Query resolvers correctly', () => {
    // Define the expected combined resolvers
    const expectedResolvers = {
      Query: {
        ...require('./authResolvers').Query,
        ...require('./financeResolvers').Query,
        ...require('./transactionResolvers').Query
      }
    };

    // Test if the combined Query resolvers match the expected resolvers
    expect(resolvers.Query).toEqual(expectedResolvers.Query);
  });

  it('should combine Mutation resolvers correctly', () => {
    // Define the expected combined resolvers
    const expectedResolvers = {
      Mutation: {
        ...require('./authResolvers').Mutation,
        ...require('./financeResolvers').Mutation,
        ...require('./transactionResolvers').Mutation
      }
    };

    // Test if the combined Mutation resolvers match the expected resolvers
    expect(resolvers.Mutation).toEqual(expectedResolvers.Mutation);
  });
});
