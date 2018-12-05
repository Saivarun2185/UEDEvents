var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = new Schema({
    "firstname": { type: String, required: true },
    "lastname": { type: String, required: true },
    "email": { type: String, required: true },
    "subject": { type: String, required: true },
    "reply": { type: String, required: false }

});

module.exports = mongoose.model('Contact', Contact);