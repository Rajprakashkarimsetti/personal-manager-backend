const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema/typeDefs'); // Ensure this path is correct
const resolvers = require('./graphql/resolvers'); // Ensure this path is correct

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add context if needed
    return {};
  }
});

async function startServer() {
  const app = express();
  const httpServer = require('http').createServer(app);

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer().catch((err) => {
  console.error(err);
});
