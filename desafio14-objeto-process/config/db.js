const mongoose = require('mongoose');

const db =
    process.env.MONGO_URI ||
    'mongodb+srv://admin:admin@cluster0.jlce7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
