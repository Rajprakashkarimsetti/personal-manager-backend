// src/graphql/schema/authTypes.test.js
const { buildSchema, validate, parse } = require('graphql');
const { gql } = require('apollo-server-express');
const authTypes = require('./authTypes');

// Build schema from the authTypes file
const schema = buildSchema(authTypes.loc.source.body);

// Sample queries and mutations for testing
const queries = `
  query {
    login(username: "testUser", password: "testPass") {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

const mutations = `
  mutation {
    register(username: "testUser", email: "test@example.com", password: "testPass") {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

describe('Auth Types Schema', () => {
  it('should define Auth and User types with correct fields', () => {
    const authType = schema.getType('Auth');
    const userType = schema.getType('User');

    expect(authType).toBeDefined();
    expect(userType).toBeDefined();

    expect(authType.getFields()).toHaveProperty('token');
    expect(authType.getFields()).toHaveProperty('user');

    expect(userType.getFields()).toHaveProperty('id');
    expect(userType.getFields()).toHaveProperty('username');
    expect(userType.getFields()).toHaveProperty('email');
  });

  it('should define Query and Mutation types with correct fields', () => {
    const queryType = schema.getType('Query');
    const mutationType = schema.getType('Mutation');

    expect(queryType).toBeDefined();
    expect(mutationType).toBeDefined();

    expect(queryType.getFields()).toHaveProperty('login');
    expect(mutationType.getFields()).toHaveProperty('register');
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
