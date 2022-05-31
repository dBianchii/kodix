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
const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.POSTGREKODIXCONNECTIONSTRING,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function connect() {
    //if (global.connection) {
    //    return global.connection.connect()
    //}
    //
    ////apenas testando a conexão
    //const client = await pool.connect()
    //console.log("Criou pool de conexões no PostgreSQL!")
    //client.release();
    //
    ////guardando para usar sempre o mesmo
    //global.connection = pool;
    //return pool.connect()
    pool.on('connect', () => {
        console.log('Conectado ao PostgreSQL')
    })
}

async function selectUsers() {



    const res = await pool.query('SELECT * FROM users')
    //const client = await connect(){}
    //const res = await client.query('SELECT * FROM users')
    return res.rows
}

async function selectRoles() {
    try {
        connect()
        const res = await pool.query('Select * from user_roles')
        return res.rows
    } catch (err) {
        console.log(err)
    }

}

async function registerUser(login, hashedPassword, role) {
    connect()
    var generateduuid = uuid.v4()
    //Insert into users
    await pool.query(`INSERT INTO users VALUES ('${generateduuid}', '${login}', '${hashedPassword}')`)
    //Insert into userRole
    var query = `INSERT INTO user_Roles VALUES ('${generateduuid}', '${role}')`
    await pool.query(query)
}

async function insertLeadTrack(name, email, tag_site, tag, city, phone_number, utm_source, utm_campaign, utm_content) {
    connect();
    var query = `INSERT INTO lead_track VALUES (uuid_generate_v4(), Now(), ${name == null ? 'null' : "'" + name + "'"}, ${email == null ? 'null' : "'" + email + "'"}, ${tag_site == null ? 'null' : "'" + tag_site + "'"}, ${tag == null ? 'null' : "'" + tag + "'"}, ${city == null ? 'null' : "'" + city + "'"}, ${phone_number == null ? 'null' : "'" + phone_number + "'"}, ${utm_source == null ? 'null' : "'" + utm_source + "'"}, ${utm_campaign == null ? 'null' : "'" + utm_campaign + "'"}, ${utm_content == null ? 'null' : "'" + utm_content + "'"})`
    await pool.query(query)
}

module.exports = { selectUsers, selectRoles, registerUser, insertLeadTrack }