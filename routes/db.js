const { Pool } = require('pg')
require('dotenv').config();
const connectionString = process.env.POSTGREKODIXCONNECTIONSTRING
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
module.exports = pool;