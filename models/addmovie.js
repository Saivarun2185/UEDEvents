var mongoose = require('mongoose');

// Movie Schema
var AddSchema = mongoose.Schema({
    
    moviename: {
		type: String,
    },

    target: {
		type: String,
    },
    
	subject: {
		type: String,
    },

    attach: {
        type: String,
    },

    rate: {
        type:String,
    },

    subject1: {
        type: String,
    },

    
});

var addmovies = module.exports = mongoose.model('addmovie', AddSchema);