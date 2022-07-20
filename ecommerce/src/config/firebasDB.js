import admin from 'firebase-admin';
import config from './config.js';
import { loggerDefault, loggerError } from './logger.config.js';

export const firebaseDB = async () => {
    const db = config.FIREBASE;
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
