const mongoose = require('mongoose');
const config = require('./config.js');
const loggerDefault = require('./logger.js').loggerDefault;
const loggerError = require('./logger.js').loggerError;

const db = config.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        loggerDefault.info('MongoDB Connected...');
        //console.log('MongoDB Connected...');
    } catch (err) {
        loggerError.error(err.message);
        //console.error(err.message);

        //Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
