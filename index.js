const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');

// mongo DB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// create express app
const app = express();

// used to tell express to handle cookies
// which will be used for authentication by passport
app.use(
	cookieSession({
		// 30 days as milliseconds
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// key to encrypt cookie
		keys: [keys.cookieKey],
	})
);

//middleware

// tell passport to make use of cookies
app.use(passport.initialize());
app.use(passport.session());

// import routes
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
