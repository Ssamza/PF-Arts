const getAllTrans = require('../../controllers/transactions/getTransactions');

const getTransHandler = async (req, res) => {
  try {
    const { paypal_id } = req.query;
    const response = await getAllTrans();

    if (paypal_id && paypal_id !== 'undefined') {
      let paypal = response.filter((trans) => {
        return trans.paypal_id === paypal_id;
      });
      if (paypal.length === 0) {
        throw Error('Invalid or unavailable Paypal ID');
      } else {
        res.status(200).json(paypal);
      }
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

module.exports = getTransHandler;
