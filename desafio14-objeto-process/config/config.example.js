const parseArgs = require('minimist');

module.exports = {
    PORT: process.argv[2] || process.env.PORT || 3000,
    MONGO_URI: 'mongodb+srv://...............',
};
