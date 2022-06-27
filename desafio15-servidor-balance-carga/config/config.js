const parseArgs = require('minimist');
const args = parseArgs(process.argv.slice(2));
console.log(args);

module.exports = {
    PORT: args.port || process.env.PORT || 3000,
    MONGO_URI:
        'mongodb+srv://admin:admin@cluster0.jlce7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    MODE: args.mode || 'fork',
};
