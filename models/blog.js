const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var blogSchema = new Schema({

	title: {

		type: String,
		required: true
	},

	body: {

		type: String,
		required: true
	},
	
	slug: {

		required: true,
		type: String
	},

	Date: {

		default: Date.now,
		type: Date
	},

	category: {

		type: Schema.Types.ObjectId,
		ref: 'categories',
		required: true
	},

	image: {

		type: String,
		required: true
	},

	user: {

		type: Schema.Types.ObjectId,
		ref: 'users',
		required: true
	}

});

var blog = mongoose.model('blog', blogSchema);
module.exports = blog;
