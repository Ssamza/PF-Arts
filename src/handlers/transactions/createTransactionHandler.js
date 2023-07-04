const { Artwork } = require('../../db');
const createTrans = require('../../controllers/transactions/createTransactionController');

const createTransHandler = async (req, res) => {
  const buyerId = req.userId;
  const artworkIds = req.params.artworkIds.split(','); // Recibir los IDs de las obras como un array de cadenas
  const { paypal_id, purchase_value, status } = req.body;

  if (
    !buyerId ||
    !artworkIds ||
    !Array.isArray(artworkIds) ||
    artworkIds.length > 4
  ) {
    throw Error('Missing or invalid data');
  }

  try {
    const artworks = await Artwork.findAll({
      where: {
        artworkId: artworkIds, // Buscar las obras cuyos IDs estén en el array artworkIds
      },
    });

    if (artworks.length !== artworkIds.length) {
      throw Error('One or more artworks not found');
    } else {
      const sellerIds = [];
      const artworks_value = [];
      const ids_art = [];

      console.log('artworks', artworks);

      artworks.forEach((artwork) => {
        ids_art.push(artwork.artworkId);
        sellerIds.push(artwork.userId);
        artworks_value.push(artwork.price);
      });

      const response = await createTrans(
        ids_art,
        buyerId,
        sellerIds,
        paypal_id,
        artworks_value,
        purchase_value,
        status
      );
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTransHandler;
