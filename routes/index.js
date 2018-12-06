var express = require('express');
var router = express.Router();
var model = require('../models/user')
const mongoose = require('mongoose')
const db = mongoose.connection;
var ObjectId = require('mongodb').ObjectID;

let emptym = [
    {
        movie: "",
        timing: "",
        userID: ""
    }

]

let emptyb = [
    {
        quantity: "",
        price: "",
        total: "",
        date: "",
        movie: "",
        timing: "",
        userID: "",
        reference: ""
    }

]


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

// Routing 

router.get('/home', ensureAuthenticated, function (request, response) {

    response.render('home.ejs');

});

router.get('/movies', ensureAuthenticated, function (request, response) {

    response.render('movies.ejs');

});

router.get('/contact', ensureAuthenticated, function (request, response) {

    response.render('contact.ejs');

});

router.get('/rating', ensureAuthenticated, function (request, response) {

    response.render('userrating.ejs');

});

router.get('/robo', ensureAuthenticated, function (request, response) {

    response.render('robopage.ejs');

});

router.get('/agnathavasi', ensureAuthenticated, function (request, response) {

    response.render('agnathavasipage.ejs');

});

router.get('/instantfamily', ensureAuthenticated, function (request, response) {

    response.render('instantfamilypage.ejs');

});

router.get('/Nowplaying', ensureAuthenticated, function (request, response) {
    
        response.render('instantfamilypage.ejs');
    
    });

    router.get('/Comingsoon', ensureAuthenticated, function (request, response) {
        
            response.render('instantfamilypage.ejs');
        
        });

router.get('/Aravindasametha', ensureAuthenticated, function (request, response) {

    response.render('AravindaSamethapage.ejs');

});

router.get('/adminadd', ensureAuthenticated, function (request, response) {

    response.render('adminadd.ejs');

});

router.get('/admindelbooking', ensureAuthenticated, function (request, response) {
    db.collection('users').find().toArray(function (err, result1) {
    db.collection('bookings').find().toArray(function (err, result) {
        if (err) throw err;

        if (result.length == 0) {
            result = emptyb;
        }
        console.log(result1)
        response.render('admindelbooking.ejs', { use: result1, bookingslist: result });
    })
})

});

router.get('/admindelete', ensureAuthenticated, function (request, response) {

    db.collection('addmovies').find().toArray(function (err, result) {
        if (err) throw err;

        if (result.length == 0) {
            result = emptym;
        }
        // console.log(result)
        response.render('admindelete.ejs',{bookingslist: result});
    })
    
    

});

router.get('/adminrating', ensureAuthenticated, function (request, response) {

    db.collection('ratings').find().toArray(function (err, result) {
        if (err) throw err;
    response.render('adminrating.ejs', { ratingslist: result });

});
});

router.get('/booking', ensureAuthenticated, function (request, response) {

    db.collection('movies').find().toArray(function (err, result) {
        if (err) throw err;

        if (result.length == 0) {
            result = emptym;
        }
        response.render('booking.ejs', { movietime: result });
    })

});

router.get('/payment', function (request, response) {

    response.render('payment.ejs');

});

router.get('/mybookings', ensureAuthenticated, function (request, response) {

    db.collection('bookings').find().toArray(function (err, result) {
        if (err) throw err;

        if (result.length == 0) {
            result = emptyb;
        }
        response.render('mybookings.ejs', { bookingslist: result });
    })

});

router.post('/modifybookings', ensureAuthenticated, function (req, response) {

    var query = { "_id": ObjectId(req.body.idmodify) };
    db.collection('bookings').find(query).toArray(function (err, result) {
        if (err) throw err;

        if (result.length == 0) {
            result = emptyb;
        }
        response.render('modifymovies.ejs', { bookinglist: result });
    })

});

module.exports = router;

//*************
