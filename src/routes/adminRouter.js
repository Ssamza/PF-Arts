const { Router } = require('express');
const adminRouter = Router();

const getAdminHandler = require('../handlers/admin/getAdminHandler');
const deleteAdminHandler = require('../handlers/admin/deleteAdminHandler');

adminRouter.get('/', getAdminHandler);

adminRouter.delete('/delete', deleteAdminHandler);

module.exports = adminRouter;
