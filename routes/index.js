var express = require('express');
var router = express.Router();
var model = require('../models/user')
const mongoose = require('mongoose')
const db = mongoose.connection;




router.get('/', function (req, res) {

    res.render('openpage.handlebars');

});

// Passport function to make sure that pages are displayed only when they are logged in

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('success_msg', 'Please log in to continue');
        res.redirect('/users/login');
    }
}

    // Routing for disigner pull list

    router.get('/home', ensureAuthenticated, function (request, response) {

        response.render('home.ejs');

    });
    

    

module.exports = router;

//*************
