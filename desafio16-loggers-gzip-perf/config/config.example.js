const parseArgs = require('minimist');
const args = parseArgs(process.argv.slice(2));

console.log(args);

module.exports = {
    PORT: args.port || process.env.PORT || 3000,
    MONGO_URI: 'asdasddqfwsgedgdfgfdfgdfgdfgdfg',
    MODE: args.mode || 'fork', //fork o cluster
};
