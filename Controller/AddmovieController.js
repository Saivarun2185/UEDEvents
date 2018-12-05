const express = require('express')
const api = express.Router()
const Model = require('../models/addmovie')
const mongoose = require('mongoose')
const db = mongoose.connection;

api.post('/present',  function (req, res) {
    
    var moviename = req.body.moviename;
    var target = req.body.target;
    var subject = req.body.subject;
    var rate = req.body.rate;
    var attach = req.body.attach;
    var subject1 = req.body.subject1;

    var newAddMovie = new Model({
        
        moviename: moviename,
        target: target,
        subject: subject,
        rate: rate,
        attach: attach,
        subject1: subject1
        
    });
    
        Model.create(newAddMovie, function (err, Movie) {
            if (err) throw err;
        });
        return res.send("hello")
});

module.exports = api;