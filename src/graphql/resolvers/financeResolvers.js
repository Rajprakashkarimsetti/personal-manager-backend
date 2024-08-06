const { getAllTransactions } = require('../../data/inMemoryDB');

const financeResolvers = {
  Query: {
    financeSummary: () => {
      const transactions = getAllTransactions();
      console.log('Retrieved transactions for summary:', transactions); // Debug log

      let totalIncome = 0;
      let totalExpenses = 0;
      let category = new Set();
      console.log(transactions);
      
      transactions.forEach(transaction => {
        if (transaction.type === 'INCOME') {
          totalIncome += transaction.amount;
        } else if (transaction.type === 'EXPENSE') {
          totalExpenses += Math.abs(transaction.amount);
        }
        category.add(transaction.category);
      });

      const balance = totalIncome - totalExpenses;
      
      return {
        totalIncome,
        totalExpenses,
        balance,
        category: Array.from(category), // Convert Set to Array
      };
    },
  },
};

module.exports = financeResolvers;
