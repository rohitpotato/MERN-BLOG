const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

var UserSchema = mongoose.Schema({

	name: {

		type: String,
		required: true
	},

	email: {

		type: String,
		required: true,
	},

	password: {

		type: String,
		required: true
	}

});

var User = mongoose.model('users', UserSchema);

module.exports = User;