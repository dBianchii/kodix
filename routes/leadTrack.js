var express = require('express');
const { compileClientWithDependenciesTracked } = require('pug');
var router = express.Router();
const pool = require('./db')

router.get('/', function (req, res) {
    pool.query('Select * from "public"."Lead_Track"', (err, result) => {
        if (err) throw err
        res.json(result.rows)
    })
});


module.exports = router;
