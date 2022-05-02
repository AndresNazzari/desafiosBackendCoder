import config from 'config';
import admin from 'firebase-admin';

export const firebaseDB = async () => {
    const db = config.get('firebase');
    try {
        admin.initializeApp({
            credential: admin.credential.cert(db),
            databaseURL: 'https://coderbackend-8868f.firebaseio.com',
        });
        console.log('Firebase Connected...');
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};
