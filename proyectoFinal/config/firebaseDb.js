import config from 'config';
const db = config.get('firebase');

export default firebaseDB = async () => {
    try {
        console.log('Firebase Connected...');
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};
