import config from 'config';
import admin from 'firebase-admin';

const db = config.get('firebase');

export const firebaseDB = async () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(db),
        });
        console.log('Firebase Connected...');
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};
