const {
  getAllAdmin,
} = require('../../controllers/admin/getAllAdminController');

const getAdminHandler = async (req, res) => {
  try {
    const response = await getAllAdmin();
    res.status(200).json(response);
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

module.exports = getAdminHandler;
