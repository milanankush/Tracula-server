const express = require("express");
const { registerUser, fetchUsersCtrl, loginUserCtrl, userProfileCtrl, updateUserCtrl } = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/authMiddleware");
const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUserCtrl);
userRoute.get('/', authMiddleware, fetchUsersCtrl);
userRoute.get('/profile', authMiddleware, userProfileCtrl);
userRoute.put('/update', authMiddleware, updateUserCtrl)

module.exports = userRoute;