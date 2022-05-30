var express = require('express');
var router = express.Router();
const pool = require('./db')
const authenticate = require('./authenticate');
//var bodyParser = require('body-parser');
router.use(express.json());


router.get('/', authenticate, function (req, res) {
    pool.query('Select * from lead_track', (err, result) => {
        if (err) throw err
        res.json(result.rows)
    })
});

router.post('/new', authenticate, (req, res) => {
    var otherQueryString = `INSERT INTO lead_track VALUES (uuid_generate_v4, Now(), '${req.body.name}', '${req.body.email}', '${req.body.tag_site}', '${req.body.tag}', 
    '${req.body.city}', '${req.body.phone_number}', ${req.body.utm_source}, ${req.body.utm_campaign}, ${req.body.utm_content})`
    var queryString = "Insert into lead_track values (uuid_generate_v4(), Now(), '" + req.body.name + "', '" + req.body.email + "', '" + req.body.tag_site + "', '" +
        req.body.tag + "', '" + req.body.city + "', '" + req.body.phone_number + "', " + req.body.utm_source + ", " + req.body.utm_campaign + ", " + req.body.utm_content + ")"

    pool.query(queryString, (err, result) => {
        if (err) throw err
        res.send('Lead inserted successfuly')
        //res.json(result.rows)
    })

});



module.exports = router;
