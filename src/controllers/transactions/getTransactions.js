const { Transaction, User, Artwork } = require('../../db');

const getAllTrans = async () => {
  const empty = await Transaction.count();
  if (empty === 0) {
    throw Error('No info available');
  } else {
    const transactions = await Transaction.findAll({
      include: [
        {
          model: Artwork,
          attributes: ['title'],
          paranoid: false,
          include: [
            {
              model: User,
              attributes: ['userName'],
            },
          ],
        },
      ],
    });
    return transactions;
  }
};

module.exports = getAllTrans;
