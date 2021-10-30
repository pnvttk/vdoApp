const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const db = "mongodb://127.0.0.1:27017/meanauth"
mongoose.Promise = global.Promise
mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error! " + err)
    }
})

router.get('/', function (req, res) {
    res.send('api works')
})

module.exports = router;