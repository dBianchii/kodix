const { Client } = require('pg')
require('dotenv').config();
const connectionString = process.env.POSTGREKODIXCONNECTIONSTRING
const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
module.exports = client;