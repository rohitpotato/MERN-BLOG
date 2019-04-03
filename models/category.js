const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var categorySchema = new Schema({

	title: {

		type: String,
		required: true
	},

	user: {

		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true
	}

});

var categories = mongoose.model('categories', categorySchema);

module.exports = categories;