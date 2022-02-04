const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const UserModel = require('./model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const JWT_SECRET = 'dshjfkshoirjwekjbrui!@#$%^&*(*&^%$#3weuo8irwehnsdjgfe2wi'

mongoose.connect(process.env.MONGODB_CONNECT, (error) => {
    if(error) {
        return console.log(error);
    } else {
        console.log('Mongoose connected')
    }
    })

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(express.json())

app.post('/api/register', async (req, res) => {

    const {username, password: plainTextPassword} = req.body

    if(!username || typeof username !== 'string') {
        return res.json({status: 'error', error: 'Invalid username'})
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({status: 'error', error: 'Invalid password'})
    }

    if (plainTextPassword.length < 6) {
        return res.json({status: 'error', error: 'Password needs to be at least 6 characters long'})
    }

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await UserModel.create({
            username,
            password
        })
        console.log('user created: ', response);
    } catch (error) {
        console.log(error.message);
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'Username already in use'})
        }
        throw error
    }

    console.log(await bcrypt.hash(password, 10))
    res.json({status: 'ok'})
})

app.post('/api/login', async (req, res) => {

    const {username, password} = req.body

    const user = await UserModel.findOne({ username, password}).lean()

    console.log(user);

    if(!user) {
        return res.json({status: 'error', error: 'Invalid username/password'})
    }

    if(await bcrypt.compare(user.password)) {

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET)

        return res.json({status: 'ok', data: token})
    }

    // res.json({status: 'error', error: 'Invalid username/passord'})
})

app.listen(5000, () => {
    console.log('Server gestart op poort 5000')
})