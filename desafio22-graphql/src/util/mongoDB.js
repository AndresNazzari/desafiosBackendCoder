import { loggerDefault, loggerError } from '../config/logger.config.js';
import mongoose from 'mongoose';
import config from '../config/config.js';

const db = config.MONGO_URI;

export const mongoDB = async () => {
    try {
        await mongoose.connect(db);
        loggerDefault.info('MongoDB Connected...');
    } catch (err) {
        loggerError.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};
