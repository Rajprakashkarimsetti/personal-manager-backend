const authResolvers = require('./authResolvers');
const financeResolvers = require('./financeResolvers');
const transactionResolvers = require('./transactionResolvers');

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...financeResolvers.Query,
    ...transactionResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...financeResolvers.Mutation,
    ...transactionResolvers.Mutation,
  },
};

module.exports = resolvers;
