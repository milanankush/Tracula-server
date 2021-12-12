const Income = require("../../models/Income");
const expressAsyncHandler  = require('express-async-handler');


const createIncCtrl = expressAsyncHandler( async (req,res) => {
    const { title, amount, description } = req.body;
    try {
        const income = await Income.create({ title, amount, description, user: req?.user?._id });
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});

const fetchAllIncCtrl = expressAsyncHandler( async (req,res) => {
    console.log(req?.user);
    const { page } = req?.query;
    try {
        const income = await Income.paginate({}, { limit: 10, page: Number(page), populate: 'user' });
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});

const fetchIncDetailsCtrl = expressAsyncHandler( async (req,res) => {
    const { id } = req?.params;
    try {
        const income = await Income.findById(id);
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});

const updateIncCtrl = expressAsyncHandler(async (req,res) => {
    const { id } = req?.params;
    const { title, amount, description } = req.body;
    try {
        const income = await Income.findByIdAndUpdate(id, {
            title,
            amount,
            description,
        }, { new: true });
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});

const deleteIncCtrl = expressAsyncHandler(async (req,res) => {
    const { id } = req?.params;
    try {
        const income = await Income.findByIdAndDelete(id);
        res.json(income);
    } catch (error) {
        res.json(error);
    }
});

module.exports = { createIncCtrl, fetchAllIncCtrl, fetchIncDetailsCtrl, updateIncCtrl, deleteIncCtrl };