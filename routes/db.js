//const { Pool } = require('pg')
//require('dotenv').config();
//const connectionString = process.env.POSTGREKODIXCONNECTIONSTRING
//const pool = new Pool({
//    connectionString: connectionString,
//    ssl: {
//        rejectUnauthorized: false,
//    },
//});
//module.exports = pool;

async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.POSTGREKODIXCONNECTIONSTRING,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

async function selectUsers() {
    const client = await connect();
    const res = await client.query('SELECT * FROM users');
    return res.rows;
}

async function selectRoles() {
    const client = await connect();
    const res = await client.query('Select * from user_roles');
    return res.rows;
}

async function registerUser(login, hashedPassword) {
    const client = await connect();
    const res = await client.query(`INSERT INTO users VALUES (${login}, ${hashedPassword})`);
    return res.rows;
}

module.exports = { selectUsers, selectRoles, registerUser }