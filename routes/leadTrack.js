var express = require('express');
var router = express.Router();
const client = require('./db')

router.get('/', function (req, res) {
    client.connect();
    client.query('Select * from "public"."Lead_Track"', (err, result) => {
        client.end()
        res.json(result.rows)
        //res.render('leadtrack', { data: result.rows })
    })
});


module.exports = router;
