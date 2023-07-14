const { getAllArtwork } = require('../../controllers/artworks/getController');

const getArtworkHandler = async (req, res) => {
  try {
    const { title, authorName } = req.query;
    const response = await getAllArtwork();

    if (title) {
      let artworkName = response.filter((works) => {
        return works.title.toLowerCase().includes(title.toLowerCase());
      });

      if (artworkName.length === 0) {
        throw Error('Artwork not available');
      } else {
        res.status(200).json(artworkName);
      }
    } else if (authorName) {
      let author = response.filter((works) => {
        return works.user.userName
          .toLowerCase()
          .includes(authorName.toLowerCase());
      });

      if (author.length === 0) {
        throw Error('User/Artist not available');
      } else {
        res.status(200).json(author);
      }
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

module.exports = getArtworkHandler;
