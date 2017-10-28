var mongoose = require('mongoose');

var Activelist = mongoose.Schema({
	username: {
		type: String,
	}
});

var Active = module.exports = mongoose.model('Activelist', Activelist);