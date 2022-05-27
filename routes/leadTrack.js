var express = require('express');
var router = express.Router();
const { Client } = require('pg')
require('dotenv').config();

const connectionString = process.env.POSTGREKODIXCONNECTIONSTRING

//POSTGREKODIXCONNECTIONSTRING
const client = new Client({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

var array = [];
client.connect();
client.query('Select * from "public"."Lead_Track"', (err, res) => {

    for (let i = 0; i < res.rows.length; i++) {
        const element = res.rows[i];
        array.push(element)
    }

    client.end()
})


router.get('/', function (req, res) {
    //res.send(array[0].name + " " + array[0].email + " " + array[1].name + " " + array[1].email)
    res.render('leadtrack', { data: array })
});


module.exports = router;
