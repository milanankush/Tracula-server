const expressAsyncHandler  = require('express-async-handler');
const User = require('../../models/User');
const generateToken = require("../../middlewares/generateToken");


const registerUser = expressAsyncHandler(async(req, res) => {
    const { email, firstname, lastname, password } = req?.body;

    const userExists = await User.findOne({ email });

    if(userExists) throw new Error("User already exists");
    try {
       const user = await User.create({ email, firstname, lastname, password });
       res.status(200).json(user);
    } catch (error) {
        res.json(error);
    }
});

const fetchUsersCtrl = expressAsyncHandler( async (req,res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.json(error);
    }
});

const loginUserCtrl = expressAsyncHandler( async (req,res) => {
    const { email, password } = req?.body;
    
    const userFound = await User.findOne({ email });
    if(userFound && (await userFound?.isPasswordMatch(password))){
        res.json({
            _id: userFound?._id,
            firstname: userFound?.firstname,
            lastname: userFound?.lastname,
            email: userFound?.email,
            isAdmin: userFound?.isAdmin,
            token: generateToken(userFound?._id),
        });
    }else{
        res.status(401);
        throw new Error("Invalid login credentials");
    }
    
});


//user profile
const userProfileCtrl = expressAsyncHandler( async (req, res) => {
    try {
        const profile = await User.findById(req?.user?._id).populate(['expenses', 'income']);
        res.json(profile);
    } catch (error) {
        res.json(error);
    }
});

//user profile
const updateUserCtrl = expressAsyncHandler( async (req, res) => {
    try {
        const profile = await User.findByIdAndUpdate(req?.user?._id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
        }, { new: true, runValidators: true });
        res.json(profile);
    } catch (error) {
        res.json(error);
    }
});

module.exports = { registerUser, fetchUsersCtrl, loginUserCtrl, userProfileCtrl, updateUserCtrl };