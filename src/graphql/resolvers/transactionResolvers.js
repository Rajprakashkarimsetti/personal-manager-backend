const inMemoryDB = require('../../data/inMemoryDB');

const resolvers = {
    Query: {
        getAllTransactions: async () => {
            return inMemoryDB.getTransactions();
        },
        getTransactionById: async (_, { id }) => {
            return inMemoryDB.getTransactionById(id);
        }
    },
    Mutation: {
        createTransaction: async (_, { amount, description, date, category,type }) => {
            const newTransaction = {
                id: Date.now().toString(),
                amount,
                description,
                date,
                category,
                type
            };
            // Save the new transaction and return it
            return inMemoryDB.saveTransaction(newTransaction);
        },
        deleteTransaction: async (_, { id }) => {
            const success = inMemoryDB.deleteTransaction(id);
            if (!success) {
                throw new Error('Transaction not found');
            }
            return { id };
        },
        updateTransaction: async (_, { id, amount, description, date, category,type }) => {
            return inMemoryDB.updateTransaction({ id, amount, description, date, category,type });
        }
    }
};

module.exports = resolvers;
