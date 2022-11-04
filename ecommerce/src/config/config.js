import ParseArgs from 'minimist';

const args = ParseArgs(process.argv.slice(2));

export default {
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || test_token_key,
  PORT: args.port || process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || '',
  MODE: args.mode || process.env.MODE || 'fork',
  DAO: args.dao || process.env.DAO || 'mongo',
  ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD,
  FROM_EMAIL: process.env.FROM_EMAIL,
  TO_EMAIL: process.env.TO_EMAIL,
  PASS_EMAIL: process.env.PASS_EMAIL,
};
