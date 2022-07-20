import { loggerDefault, loggerError } from './logger.config.js';
import mongoose from 'mongoose';
import config from './config.js';

const db = config.MONGO_URI;

export default () => {
    try {
        mongoose.connect(db);
        loggerDefault.info('MongoDB Connected...');
    } catch (err) {
        loggerError.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};
