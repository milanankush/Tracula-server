const express = require("express");
const { createIncCtrl, fetchAllIncCtrl, fetchIncDetailsCtrl, updateIncCtrl, deleteIncCtrl } = require("../../controllers/income/incomeCtrl");
const incomeRoute = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');

incomeRoute.post('/', authMiddleware, createIncCtrl);
incomeRoute.get('/', authMiddleware, fetchAllIncCtrl);
incomeRoute.get('/:id', authMiddleware, fetchIncDetailsCtrl);
incomeRoute.put('/:id', authMiddleware, updateIncCtrl);
incomeRoute.delete('/:id', authMiddleware, deleteIncCtrl);

module.exports = incomeRoute;