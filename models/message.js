var mongoose = require('mongoose');

var Message = mongoose.Schema({
	message: {
		type: String,
	}
});

var MessageX = module.exports = mongoose.model('Message', Message);