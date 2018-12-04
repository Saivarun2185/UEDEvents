const express = require('express')
const api = express.Router()
const Model = require('../models/movie')
const mongoose = require('mongoose')
const db = mongoose.connection;

api.post('/selectMovie',  function (req, res) {
    
    var timing = req.body.timing;
    var movie = req.body.movie;

    var newMovie = new Model({
        
        timing: timing,
        movie: movie
        
    });
    
        Model.create(newMovie, function (err, Movie) {
            if (err) throw err;
        });
        return res.redirect('/booking')
});

module.exports = api;