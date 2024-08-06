// src/index.js
const express = require('express');
const server = require('./graphql/index'); // Import Apollo Server setup

const app = express();
server.applyMiddleware({ app }); // Apply Apollo Server middleware

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}${server.graphqlPath}`);
});
