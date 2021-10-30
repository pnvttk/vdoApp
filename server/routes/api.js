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

router.put('/video/:id', function (req, res) {
    console.log('Update Video')
    Video.findByIdAndUpdate(req.params.id,
        {
        $set: {title: req.body.title, url: req.body.url, description: req.body.description}
    },
    {
        new: true
    },
        function (err, updatedVideo) {
            if (err) {
                res.send("Error update Video")
            } else {
                res.json(updatedVideo)
            }
        }
    )
})

router.delete('/video/:id', function (req, res) {
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
        if (err) {
            res.send("Error deleting video");
        } else {
            res.json(deletedVideo);
        }
    }
    );
})

module.exports = router;