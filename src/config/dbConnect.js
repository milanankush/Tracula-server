const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect( process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("Db connected successfully");
    } catch (error) {
        console.log(`Err ${error}`);
    }
}

module.exports = dbConnect;