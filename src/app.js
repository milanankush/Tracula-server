const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const dbConnect = require('./config/dbConnect.js');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware.js');
const userRoute = require('./routes/users/usersRoute.js');
const incomeRoute = require("./routes/income/incomeRoutes");
const expenseRoute = require("./routes/expenses/expenseRoutes");
const accountStatsRoute = require("./routes/accountStatsRoute/accountStatsRoute");

const app = express();

dotenv.config();
dbConnect();
app.use(express.json());
app.use(cors());


app.get('/', (req,res) => {
    res.json({message: "Welcome to Expenses-Tracker"});
})

app.use('/api/users', userRoute);
app.use('/api/income', incomeRoute);
app.use('/api/expense', expenseRoute);
app.use("/", accountStatsRoute);


app.use(notFound);
app.use(errorHandler);

module.exports = app;