var mongoose = require('mongoose');

// Movie Schema
var RatingSchema = mongoose.Schema({
	movie: {
		type: String,
    },

    stars: {
        type: String,
    },

    comments: {
        type: String,
    },

    username: {
        type: String,
    }
    
});

var rating = module.exports = mongoose.model('rating', RatingSchema);