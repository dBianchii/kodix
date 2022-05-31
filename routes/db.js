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
const uuid = require('uuid')

async function connect() {
    if (global.connection)
        return global.connection.connect()

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: process.env.POSTGREKODIXCONNECTIONSTRING,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    //apenas testando a conexão
    const client = await pool.connect()
    console.log("Criou pool de conexões no PostgreSQL!")
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect()
}

async function selectUsers() {
    const client = await connect()
    const res = await client.query('SELECT * FROM users')
    return res.rows
}

async function selectRoles() {
    const client = await connect()
    const res = await client.query('Select * from user_roles')
    return res.rows
}

async function registerUser(login, hashedPassword, role) {
    const client = await connect()
    var generateduuid = uuid.v4()
    //Insert into users
    await client.query(`INSERT INTO users VALUES ('${generateduuid}', '${login}', '${hashedPassword}')`)
    //Insert into userRole
    var query = `INSERT INTO user_Roles VALUES ('${generateduuid}', '${role}')`
    await client.query(query)
}

async function insertLeadTrack(name, email, tag_site, tag, city, phone_number, utm_source, utm_campaign, utm_content) {
    const client = await connect();
    var query = `INSERT INTO lead_track VALUES (uuid_generate_v4(), Now(), ${name == null ? 'null' : "'" + name + "'"}, ${email == null ? 'null' : "'" + email + "'"}, ${tag_site == null ? 'null' : "'" + tag_site + "'"}, ${tag == null ? 'null' : "'" + tag + "'"}, ${city == null ? 'null' : "'" + city + "'"}, ${phone_number == null ? 'null' : "'" + phone_number + "'"}, ${utm_source == null ? 'null' : "'" + utm_source + "'"}, ${utm_campaign == null ? 'null' : "'" + utm_campaign + "'"}, ${utm_content == null ? 'null' : "'" + utm_content + "'"})`
    await client.query(query)
}

module.exports = { selectUsers, selectRoles, registerUser, insertLeadTrack }