const { Router } = require('express');
const transRouter = Router();

const createTransHandler = require('../handlers/transactions/createTransactionHandler');
const getTransHandler = require('../handlers/transactions/getTransactionHandler');
const authenticateToken = require('../utils/authenticateToken');

transRouter.post('/:artworkIds', authenticateToken, createTransHandler);

transRouter.get('/', getTransHandler);

// transRouter.delete('/delete/:userId/:artworkId', deleteFavsHandler);

module.exports = transRouter;
