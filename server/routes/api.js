const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Video = require('../models/video')

const db = "mongodb://127.0.0.1:27017/meanauth"
mongoose.Promise = global.Promise
mongoose.connect(db, function (err) {
    if (err) {
        console.error("Error! " + err)
    }
})

router.get('/videos', function (req, res) {
    console.log('Get request for all videos')
    Video.find({})
        .exec(function (err, videos) {
            if (err) {
            console.log("Error retrieving videos")
            } else {
                res.json(videos)
        }
    })
})

router.get('/videos/:id', function (req, res) {
    console.log('Get request for one videos')
    Video.findById(req.params.id)
        .exec(function (err, videos) {
            if (err) {
            console.log("Error retrieving videos")
            } else {
                res.json(videos)
        }
    })
})

router.post('/video', function (req, res) {
    console.log('Post a Video')
    var newVideo = new Video()
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function (err, insertedVideo) {
        if (err) {
            console.log('Error saving Video')
        } else {
            res.json(insertedVideo)
        }
    })
})

module.exports = router;