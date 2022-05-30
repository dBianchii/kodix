const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const authenticate = require('./authenticate')
const db = require('./db')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.use(express.json())

router.get('/list', authenticate, async (req, res) => {
    const users = await db.selectUsers();

    res.json(users)
})

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const queryString = "Insert into users values (uuid_generate_v4(), '" + req.body.name + "', '" + hashedPassword + "')"

        await db.registerUser(req.body.name, hashedPassword)
        pool.query(queryString, (err, result) => {
            if (err) throw err
        })
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

//router.post('/roles', authenticate, async (req, res) => {
//    try {
//        pool.query('Insert into userRoles values (' + req.body.name + ', ' + req.body.Role, (err, result) => {
//if (err) throw err
//res.send('Role assigned')
//        })
//        res.status(201).send()
//    } catch {
//        res.status(500).send()
//    }
//
//})

module.exports = router