const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authResolvers = require('./authResolvers'); // Corrected path

describe('Authentication Resolvers', () => {
  let users;

  beforeEach(() => {
    // Override the global users array in authResolvers
    global.users = [];
    users = global.users;
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const args = { name: 'testuser', email: 'test@example.com', password: 'password123' };
      const result = await authResolvers.Mutation.register(null, args);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('email', args.email);
    });

    it('should not register an existing user', async () => {
      users.push({ id: '1', name: 'testuser', email: 'test@example.com', password: 'hashedpassword' });

      const args = { name: 'testuser', email: 'test@example.com', password: 'password123' };
      await expect(authResolvers.Mutation.register(null, args)).rejects.toThrow('User already exists');
    });
  });

  describe('login', () => {
    it('should log in an existing user', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      users.push({ id: '1', name: 'testuser', email: 'test@example.com', password: hashedPassword });

      const args = { email: 'test@example.com', password: 'password123' };
      const result = await authResolvers.Mutation.login(null, args);

      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('user');
      expect(result.user).toHaveProperty('email', args.email);
    });

    it('should not log in with an invalid password', async () => {
      users.push({ id: '1', name: 'testuser', email: 'test@example.com', password: await bcrypt.hash('password123', 10) });

      const args = { email: 'test@example.com', password: 'wrongpassword' };
      await expect(authResolvers.Mutation.login(null, args)).rejects.toThrow('Invalid password');
    });

    it('should not log in a non-existing user', async () => {
      const args = { email: 'nonexistent@example.com', password: 'password123' };
      await expect(authResolvers.Mutation.login(null, args)).rejects.toThrow('No such user found');
    });
  });
});
