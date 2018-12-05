var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
const favicon = require('serve-favicon');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var nodemailer = require('nodemailer');



mongoose.connect('mongodb+srv://akhil:uedpwd@cluster0-genok.mongodb.net/test?retryWrites=true');
mongoose.connection.once('open', () => {
  console.log('connected to database');
});
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var Contact = require('./models/contact.js');
var movies = require('./Controller/MovieController');
var bookings = require('./Controller/BookingController');

var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'Assets')));
// app.use(favicon(path.join(__dirname, 'Images', 'favicon-16x16.png')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.post("/contact", (req, res) => {

  var myData = new Contact(req.body);
  myData.save()
    .then(item => {
      res.render("contact.ejs");

    })

    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});

app.post("/payment", function(req,res){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gdp2.fastrack@gmail.com',
      pass: 'gdp21234'
    }
  });

  var mailOptions = {
    from: 'gdp2.fastrack@gmail.com',
    to: req.body.email1,
    subject: 'Ticket booking confirmation from vas theatres',
    html: '<p>Hello,</p><p>You have successfully booked ticket for a movie in vas theatres </p>'  + '<p>Thanks&Regards</p><p>conference team</p> ',
  };
  console.log(req.body.email1);
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // res.redirect('/faculty');
      res.send("sucess")
    }
  });
})
// Express Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.success = req.flash('success');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});



app.use('/', routes);
app.use('/users', users);
app.use('/MovieController', movies);
app.use('/BookingController', bookings);

// if we get a 404 status, render 404.ejs view
app.use(function (request, response) {
  response.status(404).render('404.ejs');
});

// Set Port
app.set('port', (process.env.PORT || 8081));

var server = app.listen(app.get('port'), function () {
  console.log('Server started on port ' + app.get('port'));
});

exports.closeServer = function () {
  server.close();
};

module.exports = app