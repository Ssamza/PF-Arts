const deleteAdminArt = require('../../controllers/admin/deleteArtController');
const deleteAdminUser = require('../../controllers/admin/deleteUserController');

const deleteAdminHandler = async (req, res) => {
  try {
    const { artworkId, userId } = req.query;

    if (artworkId) {
      const responseArt = await deleteAdminArt(artworkId);
      res.status(200).json(responseArt);
    } else if (userId) {
      const responseUser = await deleteAdminUser(userId);
      res.status(200).json(responseUser);
    } else {
      throw Error('Artwork or User not available');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteAdminHandler;
