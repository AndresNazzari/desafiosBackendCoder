import ParseArgs from 'minimist';

const args = ParseArgs(process.argv.slice(2));

export default {
    PORT: args.port || process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || '',
    MODE: args.mode || process.env.MODE || 'fork',
    DAO: args.dao || process.env.DAO || 'mongo',
    FIREBASE: {
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id,
        private_key: process.env.private_key,
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        auth_uri: process.env.auth_uri,
        token_uri: process.env.token_uri,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.client_x509_cert_url,
    },
};
