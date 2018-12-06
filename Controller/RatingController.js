const express = require('express')
const api = express.Router()
const Model = require('../models/rating')
const mongoose = require('mongoose')
const db = mongoose.connection;
var ObjectId = require('mongodb').ObjectID;

api.post('/rating',  function (req, res) {

    var username = req.body.username;
    var movie = req.body.movie;
    var stars = req.body.stars;
    var comments = req.body.comments;


    var newRating = new Model({

        username: username,
        movie: movie,
        stars: stars,
        comments: comments
        
    });
    
        Model.create(newRating, function (err, Rating) {
            if (err) throw err;
        });
        return res.render('userrating.ejs');
});

module.exports = api;