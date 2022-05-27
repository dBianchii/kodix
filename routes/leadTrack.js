var express = require('express');
var router = express.Router();
const pool = require('./db')
var bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/', function (req, res) {
    pool.query('Select * from lead_track', (err, result) => {
        if (err) throw err
        res.json(result.rows)
    })
});

router.post('/json', (req, res) => {
    console.log('yee')
    console.log(req.body)
    res.send(req.body);    // echo the result back
});

router.get('/new/:name/:email/:tag_site/:tag/:city/:phone_number/:utm_souce/:utm_campaign/:utm_content', function (req, res) {
    var queryString = "Insert into lead_track values (uuid_generate_v4(), Now(), '" + req.params.name + "', '" + req.params.email + "', '" + req.params.tag_site + "', '" +
        req.params.tag + "', '" + req.params.city + "', " + req.params.phone_number + ", " + req.params.utm_souce + ", " + req.params.utm_campaign + ", " + req.params.utm_content + ")"

    pool.query(queryString, (err, result) => {
        if (err) throw err
        res.send('Lead inserted successfuly')
        //res.json(result.rows)
    })

});


module.exports = router;
