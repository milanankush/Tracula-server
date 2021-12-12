const express = require("express");
const { createExpCtrl, fetchAllExpCtrl, fetchExpDetailsCtrl, updateExpCtrl, deleteExpCtrl } = require("../../controllers/expenses/expenseCtrl");
const expenseRoute = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware');

expenseRoute.post('/', authMiddleware, createExpCtrl);
expenseRoute.get('/', authMiddleware, fetchAllExpCtrl);
expenseRoute.get('/:id', authMiddleware, fetchExpDetailsCtrl);
expenseRoute.put('/:id', authMiddleware, updateExpCtrl);
expenseRoute.delete('/:id', authMiddleware, deleteExpCtrl);

module.exports = expenseRoute;