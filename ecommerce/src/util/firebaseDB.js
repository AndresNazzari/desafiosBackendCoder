import admin from 'firebase-admin';
import config from '../config/config.js';
import { loggerDefault, loggerError } from '../config/logger.config.js';

const db = config.FIREBASE;

export const firebaseDB = async () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(db),
            databaseURL: 'https://coderbackend-8868f.firebaseio.com',
        });
        loggerDefault.info('Firebase Connected...');
    } catch (error) {
        loggerError.error(error.message);
        //Exit process with failure
        process.exit(1);
    }
};
