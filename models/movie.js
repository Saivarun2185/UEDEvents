var mongoose = require('mongoose');

// Movie Schema
var MovieSchema = mongoose.Schema({
	movie: {
		type: String,
    },

    timing: {
        type: String,
    },

    userID: {
        type: String,
    }
    
});

var movie = module.exports = mongoose.model('movie', MovieSchema);