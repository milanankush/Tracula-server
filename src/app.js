const express = require('express');
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect.js');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware.js');
const userRoute = require('./routes/users/usersRoute.js');

const app = express();

dotenv.config();
dbConnect();
app.use(express.json());

app.use('/api/users', userRoute);

app.use(notFound);
app.use(errorHandler);

module.exports = app;