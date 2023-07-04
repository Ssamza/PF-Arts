const { Artwork, User } = require('../../db');

const getAllAdmin = async () => {
  const count = await Artwork.count();
  if (count === 0) {
    throw Error('No artworks available');
  }
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
