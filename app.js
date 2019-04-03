const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Blog = require('./routes/blog');
const User = require('./routes/user');
const Category = require('./routes/Category');
const port = 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/blogapi', { useNewUrlParser: true }).then(() => {

	console.log('Connected to mongo database');

});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/auth', User);
app.use('/blog', Blog);
app.use('/category', Category);

app.listen(port, () => {

	console.log(`Running on port ${port}`);

});
