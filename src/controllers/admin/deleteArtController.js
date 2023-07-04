const { Artwork } = require('../../db');

const deleteUser = async (artworkId) => {
  const artwork = await Artwork.destroy({
    where: {
      artworkId: artworkId,
    },
    force: true,
  });
  if (!artwork) {
    throw new Error('Artwork not found');
  }

  return {
    message: 'The artwork was deleted by an Admin',
  };
};

module.exports = deleteUser;
