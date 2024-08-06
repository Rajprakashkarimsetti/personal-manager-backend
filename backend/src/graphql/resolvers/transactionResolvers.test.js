// src/graphql/resolvers/transactionResolvers.test.js
const resolvers = require('./transactionResolvers');
const inMemoryDB = require('../../data/inMemoryDB');

// Mock the inMemoryDB methods
jest.mock('../../data/inMemoryDB', () => ({
    getTransactions: jest.fn(),
    getTransactionById: jest.fn(),
    saveTransaction: jest.fn(),
    deleteTransaction: jest.fn(),
    updateTransaction: jest.fn()
}));

describe('Transaction Resolvers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Query Resolvers', () => {
        it('should fetch all transactions', async () => {
            const mockTransactions = [
                { id: '1', amount: 100, description: 'Salary', date: '2024-01-01', category: 'Salary' },
                { id: '2', amount: -50, description: 'Groceries', date: '2024-01-02', category: 'Groceries' }
            ];
            inMemoryDB.getTransactions.mockResolvedValue(mockTransactions);

            const result = await resolvers.Query.getAllTransactions();
            expect(result).toEqual(mockTransactions);
            expect(inMemoryDB.getTransactions).toHaveBeenCalled();
        });

        it('should fetch transaction by ID', async () => {
            const mockTransaction = { id: '1', amount: 100, description: 'Salary', date: '2024-01-01', category: 'Salary' };
            inMemoryDB.getTransactionById.mockResolvedValue(mockTransaction);

            const result = await resolvers.Query.getTransactionById(null, { id: '1' });
            expect(result).toEqual(mockTransaction);
            expect(inMemoryDB.getTransactionById).toHaveBeenCalledWith('1');
        });
    });

    describe('Mutation Resolvers', () => {
        it('should create a new transaction', async () => {
            const newTransaction = { 
                id: 'any-string', // This will be dynamically generated, so we use a placeholder here
                amount: 200,
                description: 'Freelance',
                date: '2024-01-03',
                category: 'Freelance'
            };
            inMemoryDB.saveTransaction.mockImplementation(transaction => {
                return { ...transaction, id: 'generated-id' };
            });

            const result = await resolvers.Mutation.createTransaction(null, {
                amount: 200,
                description: 'Freelance',
                date: '2024-01-03',
                category: 'Freelance'
            });

            expect(result).toMatchObject({
                amount: 200,
                description: 'Freelance',
                date: '2024-01-03',
                category: 'Freelance'
            });
            expect(inMemoryDB.saveTransaction).toHaveBeenCalledWith(expect.objectContaining({
                amount: 200,
                description: 'Freelance',
                date: '2024-01-03',
                category: 'Freelance'
            }));
        });

        it('should delete a transaction by ID', async () => {
            inMemoryDB.deleteTransaction.mockReturnValue(true);

            const result = await resolvers.Mutation.deleteTransaction(null, { id: '1' });
            expect(result).toEqual({ id: '1' });
            expect(inMemoryDB.deleteTransaction).toHaveBeenCalledWith('1');
        });

        it('should throw an error if transaction to delete is not found', async () => {
            inMemoryDB.deleteTransaction.mockReturnValue(false);

            await expect(resolvers.Mutation.deleteTransaction(null, { id: '1' })).rejects.toThrow('Transaction not found');
        });

        it('should update an existing transaction', async () => {
            const updatedTransaction = { id: '1', amount: 150, description: 'Updated Salary', date: '2024-01-01', category: 'Salary' };
            inMemoryDB.updateTransaction.mockResolvedValue(updatedTransaction);

            const result = await resolvers.Mutation.updateTransaction(null, {
                id: '1',
                amount: 150,
                description: 'Updated Salary',
                date: '2024-01-01',
                category: 'Salary'
            });
            expect(result).toEqual(updatedTransaction);
            expect(inMemoryDB.updateTransaction).toHaveBeenCalledWith(updatedTransaction);
        });
    });
});
