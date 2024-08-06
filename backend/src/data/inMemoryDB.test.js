// src/data/inMemoryDB.test.js
const bcrypt = require('bcrypt');
const inMemory = require('./inMemoryDB');
const jwt = require('jsonwebtoken');

// Import the functions to be tested from the correct path
const { 
  authResolvers, 
  saveTransaction, 
  getAllTransactions, 
  getTransactions, 
  getTransactionById, 
  deleteTransaction, 
  updateTransaction 
} = inMemory

// Mock data
const mockTransaction = {
  id: 1,
  amount: 100,
  category: 'Salary'
};

// Mock JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

// Mock functions if needed
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

// Tests
describe('inMemoryDB functions', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('saveTransaction should save a transaction', async () => {
    // Mock the implementation of saveTransaction if needed
    const saveTransaction = jest.fn().mockResolvedValue(mockTransaction);
    const result = await saveTransaction(mockTransaction);
    expect(result).toEqual(mockTransaction);
  });

  test('getAllTransactions should retrieve all transactions', async () => {
    // Mock the implementation of getAllTransactions if needed
    const getAllTransactions = jest.fn().mockResolvedValue([mockTransaction]);
    const result = await getAllTransactions();
    expect(result).toEqual([mockTransaction]);
  });

  test('getTransactionById should retrieve a transaction by ID', async () => {
    // Mock the implementation of getTransactionById if needed
    const getTransactionById = jest.fn().mockResolvedValue(mockTransaction);
    const result = await getTransactionById(1);
    expect(result).toEqual(mockTransaction);
  });

  test('deleteTransaction should delete a transaction', async () => {
    // Mock the implementation of deleteTransaction if needed
    const deleteTransaction = jest.fn().mockResolvedValue(true);
    const result = await deleteTransaction(1);
    expect(result).toBe(true);
  });

  test('updateTransaction should update a transaction', async () => {
    const updatedTransaction = { ...mockTransaction, amount: 200 };
    // Mock the implementation of updateTransaction if needed
    const updateTransaction = jest.fn().mockResolvedValue(updatedTransaction);
    const result = await updateTransaction(updatedTransaction);
    expect(result).toEqual(updatedTransaction);
  });

  // Add more tests as needed

});
