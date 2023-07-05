const { Artwork, User } = require('../../db');

const getAllAdmin = async () => {
  const artworks = await Artwork.findAll({
    include: {
      model: User,
      attributes: ['userName'],
    },
    paranoid: false,
  });

  return artworks;
};

module.exports = {
  getAllAdmin,
};
