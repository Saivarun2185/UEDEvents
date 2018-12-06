const express = require('express')
const api = express.Router()
const Model = require('../models/bookings')
const mongoose = require('mongoose')
const db = mongoose.connection;
var nodemailer = require('nodemailer');
var ObjectId = require('mongodb').ObjectID;

api.post('/booking1',  function (req, res) {

    var name = req.body.firstname;
    var email = req.body.email;
    var quantity = req.body.quantity;
    var price = req.body.price;
    var total = req.body.total;
    var date = req.body.date;
    var movie = req.body.movie;
    var timing = req.body.timing;
    var userID = req.body.userID;
    var reference = req.body.reference;

    var newMovie = new Model({

        name: name,
        email: email,
        quantity: quantity,
        price: price,
        total: total,
        date: date,
        movie: movie,
        timing: timing,
        userID: userID,
        reference: reference
        
    });
    
        Model.create(newMovie, function (err, Movie) {
            if (err) throw err;
        });
        return res.render('payment.ejs',{name: req.body.firstname, email: req.body.email, quantity: req.body.quantity, price : req.body.price, total: req.body.total, date: req.body.date, movie: req.body.movie, timing: req.body.timing})
});

api.post('/delete', function (req, res) {
    var query = { "_id": ObjectId(req.body.id) };

    db.collection('bookings').deleteOne(query, function (err, result) {
        if (err) throw err;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'gdp2.fastrack@gmail.com',
              pass: 'gdp21234'
            }
          });
        
          var mailOptions = {
            from: 'gdp2.fastrack@gmail.com',
            to: req.body.email,
            subject: 'Ticket booking cancellation from vas theatres',
            html: '<p>Hello,</p><p>We regret to inform you that you have cancelled your movie in vas theatres. </p>'+'Name:'+ req.body.fname +'<br>'+'Movie name:'+ req.body.mov +'<br>' +'Number of tickets booked:'+ req.body.quan +'<br>' +'Price:'+ req.body.tot +'<br>' +'Time:'+ req.body.time +'<br>' + '<p>Thanks&Regards</p><p>VAS Theatres</p> ',
          };
          
          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        })
            return res.redirect('/mybookings')
    });
})

api.post('/bookingm',  function (req, res) {

    db.collection('bookings').update({ '_id': ObjectId(req.body.userID) }, { $set: { 'timing': req.body.timing, 'name': req.body.firstname, 'email': req.body.email, 'quantity': req.body.quantity, 'price': req.body.price, 'total': req.body.total, 'date': req.body.date } });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gdp2.fastrack@gmail.com',
          pass: 'gdp21234'
        }
      });
    
      var mailOptions = {
        from: 'gdp2.fastrack@gmail.com',
        to: req.body.email,
        subject: 'Ticket booking modified from vas theatres',
        html: '<p>Hello,</p><p>You have modified your booked ticket for a movie in vas theatres. </p>'+'Name:'+ req.body.fname +'<br>'+'Movie name:'+ req.body.mov +'<br>' +'Number of tickets booked:'+ req.body.quan +'<br>' +'Price:'+ req.body.tot +'<br>' +'Time:'+ req.body.time +'<br>' + '<p>Thanks&Regards</p><p>VAS Theatres</p> ',
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })
            return res.redirect('/mybookings')

});

module.exports = api;