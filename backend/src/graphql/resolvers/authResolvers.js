// src/graphql/resolvers/authResolvers.js
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT

// Replace with your actual user data source or database connection
const users = []; 

const authResolvers = {
  Mutation: {
    register: async (parent, { name, email, password }, context, info) => {
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: `${users.length + 1}`, // Simple ID generation
        name,
        email,
        password: hashedPassword,
      };
      users.push(newUser);

      const token = jwt.sign({ userId: newUser.id }, 'YOUR_SECRET_KEY'); // Replace with your actual secret key
      return {
        token,
        user: newUser,
      };
    },

    login: async (parent, { email, password }, context, info) => {
      const user = users.find(user => user.email === email);
      if (!user) {
        throw new Error('No such user found');
      }
      
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      
      const token = jwt.sign({ userId: user.id }, 'YOUR_SECRET_KEY'); // Replace with your actual secret key
      return {
        token,
        user,
      };
    },
  },
};

module.exports = authResolvers;
