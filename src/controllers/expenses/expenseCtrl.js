const Expense = require("../../models/Expense");
const expressAsyncHandler  = require('express-async-handler');


const createExpCtrl = expressAsyncHandler( async (req,res) => {
    const { title, amount, description } = req.body;
    try {
        const expense = await Expense.create({ title, amount, description, user: req?.user?._id });
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

const fetchAllExpCtrl = expressAsyncHandler( async (req,res) => {
    console.log(req?.user);
    const { page } = req.query;
    try {
        const expense = await Expense.paginate({}, { limit:10, page: Number(page), populate: 'user' });
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

const fetchExpDetailsCtrl = expressAsyncHandler( async (req,res) => {
    const { id } = req?.params;
    try {
        const expense = await Expense.findById(id);
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

const updateExpCtrl = expressAsyncHandler(async (req,res) => {
    const { id } = req?.params;
    const { title, amount, description } = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(id, {
            title,
            amount,
            description,
        }, { new: true });
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

const deleteExpCtrl = expressAsyncHandler(async (req,res) => {
    const { id } = req?.params;
    try {
        const expense = await Expense.findByIdAndDelete(id);
        res.json(expense);
    } catch (error) {
        res.json(error);
    }
});

module.exports = { createExpCtrl, fetchAllExpCtrl, fetchExpDetailsCtrl, updateExpCtrl, deleteExpCtrl };