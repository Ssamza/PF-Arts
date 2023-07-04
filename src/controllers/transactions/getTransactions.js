const { Transaction } = require('../../db');

const getAllTrans = async () => {
  const empty = await Transaction.count();
  if (empty === 0) {
    throw Error('No info available');
  } else {
    const transactions = await Transaction.findAll();
    return transactions;
  }
};

module.exports = getAllTrans;
