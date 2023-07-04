const { Transaction, Artwork, User } = require('../../db');

const createTrans = async (
  ids_art,
  buyerId,
  sellerIds,
  paypal_id,
  artworks_value,
  purchase_value,
  status
) => {
  const responses = {};

  for (let i = 0; i < ids_art.length; i++) {
    const artworkId = ids_art[i];
    const sellerId = sellerIds[i];
    const artwork_value = artworks_value[i];

    const transaction = await Transaction.create({
      paypal_id,
      artwork: artworkId,
      buyer: buyerId,
      seller: sellerId,
      artwork_value,
      total_value: purchase_value,
      status,
    });

    const artwork = await Artwork.findByPk(artworkId);
    if (!artwork) {
      throw new Error('Artwork not found');
    }

    await transaction.addArtwork(artwork);

    const buyer = await User.findByPk(buyerId);
    const seller = await User.findByPk(sellerId);

    const response = {
      transactionId: transaction.id,
      buyer: {
        id: buyer.userId,
        name: buyer.userName,
      },
      seller: {
        id: seller.userId,
        name: seller.userName,
      },
    };

    responses[artworkId] = response;

    await artwork.destroy();
  }

  return responses;
};

module.exports = createTrans;
