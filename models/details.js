var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	username:{
		type:String,
		unique:true
	},
	name: {
		type: String,
		
	},
	place: {
		type:String
	},
	email: {
		type: [String]
	},
	phone: {
		type:[String] 
	},
	govtid:{
		type:String
	}
});

var User = module.exports = mongoose.model('Detail', UserSchema);