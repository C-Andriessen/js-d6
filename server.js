const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const UserModel = require('./model/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECT, () => {console.log('Mongoose connected')})

const app = express()
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(express.json())

app.post('/api/register', async (req, res) => {
    
})

app.listen(5000, () => {
    console.log('Server gestart op poort 5000')
})