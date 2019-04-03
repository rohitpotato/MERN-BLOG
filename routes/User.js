const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcryptjs = require('bcryptjs')
const passport = require('passport');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const salt = 'Iamasdas';

router.post('/register', (req, res) => {

	errors = {};

	const email =  req.body.email;

	if (!validator.isEmail(email)) {

		errors.email = 'Not a valid email!';
		return res.status(403).json(errors);
	} 

	User.findOne({ email: email }).then((user) => {

		if (user) {

			errors.email = 'Email already in use!';
			return res.status(400).json(errors);

		} else {

			bcryptjs.genSalt(10, function (err, salt) {

				bcryptjs.hash(req.body.password, salt, function (err, hash)  {

					if (!err) {

						new User({

							email: req.body.email,
							password: hash,
							name: req.body.name,

						}).save().then((user) => {

							const payload = { id: user.id, name: user.name, avatar: user.avatar };

							jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {

								res.json({

									token: 'Bearer ' + token,
									user
								});

							}); 

						}).catch((e) => {

							console.log(e);
						});
					}

				});

			});
		}

	});

});

router.post('/login', (req, res) => {

	const errors = {};

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {

		if(!user) {

			errors.email = 'User not found!';

			return res.status(404).json(errors);
		}

		bcryptjs.compare(password, user.password).then((isMatch) => {

			if(isMatch) {

				//console.log(keys.secret);

				const payload = { id: user.id, name: user.name, avatar: user.avatar };

				jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {

					res.json({

						token: 'Bearer ' + token,
						user

					});

				});

			} else {

				errors.password = 'Password Incorrect';
				return res.status(400).json(errors); 
			}

		});

	});

});

router.get('/verify', passport.authenticate('jwt', {session: false}), (req, res) => {

	res.json(req.user);

});

module.exports = router;