const express = require('express');
const router = express.Router();
const passport = require('passport');
const path = require('path');
const multer = require('multer');
const slugify = require('slugify');
const validator = require('validator');
const Blog = require('../models/blog');

const IMAGE_PATH = path.join(__dirname, '../');

const pather = path.join(process.cwd(), 'client/public/images');

const storage = multer.diskStorage({

	destination: `${pather}`,
	filename: function(req, file, cb) {

		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}

});

const upload = multer({

	storage: storage,
	limits: {fileSize: 1000000},
	fileFilter: function (req, file, cb) {

		var ext = path.extname(file.originalname)
		if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return cb(new Error('Only images are allowed'))
        }

        cb(null, true);
	}

}).single('image');


router.post('/imageupload', passport.authenticate('jwt', {session: false}), (req, res) => {
/*
	var g = `C:\\Users\\Rohit\\Desktop\\blogapi\\uploads/image-1541602769780.png`;
	return console.log(g.replace(`C:\\Users\\Rohit\\Desktop\\blogapi`, ''));*/
	//return console.log(process.cwd());
	errors = {};
	upload(req, res, (err) => {

		if (err) {

			errors.image = 'Image upload not successfull!';
			res.status(400).json({errors, err});
		} else {

			if (req.file == undefined) {

				errors.image = 'No file selected';
				res.status(400).json(errors);
			} else {

				//var newpath = pather.replace('C:\\Users\\Rohit\\Desktop\\blogapi\\client', '');

				res.json({

					file: `${pather.replace('C:\\Users\\Rohit\\Desktop\\blogapi\\client', '')}/${req.file.filename}`
				})
			}
		}

	});

});


router.get('/all', (req, res) => {

	Blog.find().populate('user').populate('category').then((blogs) => {

		res.json(blogs);

	}).catch((e) => {

		console.log(e);
		res.status(404).json(e);
	});

});


router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

	errors = {};	

	if (validator.isEmpty(req.body.title) || validator.isEmpty(req.body.body)) {

		errors.blog = 'Field(s) are empty!!';

		return res.status(400).json(errors);

	} else {

		new Blog({

			title: req.body.title,
			body: req.body.body,
			image: req.body.image,
			category: req.body.category,
			user: req.user.id,
			slug: slugify(req.body.title+'-'+Date.now())

		}).save().then((blog) => {

			res.json(blog);

		});
	}

});

router.get('/show/:id', (req, res) => {

	errors = {};

	Blog.findById(req.params.id).populate('user').populate('categoy').then((blog) => {

		if (blog) {

			res.json(blog);

		} else {

			errors.blog = 'The link you are looking for could not  be found!';

			res.status(404).json(errors);
		}

	});

});

router.put('/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

	errors = {};

	Blog.findById(req.params.id).then((blog) => {

		if (blog) {

			if(blog.user == req.user.id) {


				if(req.body.image) {

					blog.image = req.body.image;
				}

				blog.title = req.body.title;
				blog.body = req.body.body;
				blog.category = req.body.category;

				blog.save().then((blog) => {

					res.json(blog); 

				});
			}

		} else {

			errors.blog = 'Page not found!';

			res.status(404).json(errors);
		}

	});

});

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

		errors = {};

		Blog.findById(req.params.id).then((blog) => {

		if (blog) {

			if(blog.user == req.user.id) {

				blog.remove();
				res.send(200);
			}

		} else {

			errors.blog = 'Page not found!';

			res.status(404).json(errors);
		}

	});

});

router.get('/user', passport.authenticate('jwt', {session: false}), (req, res) => {

	errors = {};

	Blog.find({user: req.user.id}).populate('user').populate('category').then((blogs) => {

		if (blogs) {

			res.json(blogs);
		} else {

			errors.user = "User blogs not found";
			res.status(400).json(errors);
		}
	})

});

router.get('/:slug', (req, res) => {

	errors = {};

	Blog.findOne({ slug: req.params.slug }).populate('user').populate('category').then((blog) => {

		if (blog) {

			res.json(blog);
		} else {

			errors.notfound = 'Oops! Page not found!';
			res.status(400).json(errors);
		}

	});

});


module.exports = router;
