const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const authenticate = require('./authenticate')
const db = require('./db')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.use(express.json())

router.get('/list', authenticate.authorize, async(req, res) => {
    try {
        const users = await db.selectUsers();
        res.json(users)
    } catch {
        res.status(500).send()
    }
})

router.post('/register', async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await db.registerUser(req.body.login, hashedPassword, req.body.role)

        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

//router.post('/roles', authenticate.authorize, async (req, res) => {
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