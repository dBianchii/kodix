require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('./routes/db')
var bodyParser = require('body-parser');

app.use(express.json())
app.use(bodyParser.json())

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/login', AuthenticateUser, (req, res) => {
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

let refreshTokens = []
app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

async function AuthenticateUser(req, res, next) {

    const users = await db.selectUsers();
    const userRoles = await db.selectRoles()

    const user = users.find(user => user.login == req.body.login)
    const userRole = userRoles.find(x => x.userUuid == user.userId)

    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.passwordHash)) {
            if (userRole.role == "Admin")
                next()
            else {
                res.send('Not allowed')
            }
        }
        else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
}


module.exports = app