const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// serializeUser used to generate identifying piece of user info
// needed for passport to put into cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// when user submits a request from the browser cookie
// will be used to identify user
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			// trust proxy
			proxy: true,
		},
		// do something with user's google access token
		// ie add to mongo database
		async (accessToken, refreshToken, profile, done) => {
			// new User({ googleID: profile.id }).save();
			const existingUser = await User.findOne({ googleID: profile.id });

			if (existingUser) {
				return done(null, existingUser);
			}

			const user = await new User({ googleID: profile.id }).save();
			return done(null, user);
		}
	)
);

// passport.use(
// 	new FacebookStrategy(
// 		{
// 			clientID: keys.facebookClientID,
// 			clientSecret: keys.facbookClientSecret,
// 			callbackURL: '/auth/facebook/callback',
// 		},
// 		async (accessToken, refreshToken, profile, done) => {
// 			const existingUser = await User.findOne({ facebookID: profile.id });
// 			if (existingUser) {
// 				return done(null, existingUser);
// 			}
// 			const user = await new User({ facebookID: profile.id }).save();
// 			return done(null, user);
// 		}
// 	)
// );
