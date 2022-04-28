import mongoose from 'mongoose';
import config from 'config';
const db = config.get('mongo');

export default mongoDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};
