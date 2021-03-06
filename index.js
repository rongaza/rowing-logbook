const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Workout');
require('./services/passport');

// connect to mongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(console.log('MongoDB connected'))
	.catch(err => console.log(err));

// create express app
const app = express();

app.use(bodyParser.json());
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
require('./routes/workoutRoutes')(app);
require('./routes/profileRoutes')(app);

// handle routing in production
if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like main.js file or main.css file
	app.use(express.static('client/build'));

	// Express will serve up the index.html file if it doesn't
	// recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
