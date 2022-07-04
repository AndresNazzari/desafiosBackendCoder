const parseArgs = require('minimist');
const args = parseArgs(process.argv.slice(2));

module.exports = {
    PORT: args.port || process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI,
    MODE: args.mode || process.env.MODE || 'fork',
};
