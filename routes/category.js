const express = require('express');
const router = express.Router();
const passport = require('passport');
const Category = require('../models/category');
const validator = require('validator');

router.get('/all', (req, res) => {

	errors = {};

	Category.find().then((categories) => {

		res.json(categories);

	}).catch((e) => {

		errors.category = 'Categories could not be fetched';
		res.status(400).json(errors);

	});

});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

	const errors = {};

	var title = req.body.title;

	if (validator.isEmpty(title)) {

		errors.category = 'Field is required';
		res.status(400).json(errors);
	}

	Category.findOne({ title: title }).then((category) => {

		if (category) {

			errors.categories = 'Category already exists';
			res.status(401).json(errors);

		} else {

			new Category({

				title: req.body.title,
				user: req.user.id
			}).save().then((cat) => {

				res.json(cat);
			});
		}

	});

});

module.exports = router;