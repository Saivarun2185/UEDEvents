var mongoose = require('mongoose');

// Movie Schema
var BookingSchema = mongoose.Schema({
    
    name: {
		type: String,
    },
	quantity: {
		type: String,
    },

    price: {
        type: String,
    },

    total: {
        type:String,
    },

    date: {
        type: String,
    },

    movie: {
        type: String,
    },

    timing: {
        type: String,
    },

    userID: {
        type: String,
    },

    reference: {
        type: String,
    }
    
});

var bookings = module.exports = mongoose.model('bookings', BookingSchema);