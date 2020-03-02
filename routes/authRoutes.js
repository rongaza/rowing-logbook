const passport = require('passport');

module.exports = app => {
	// google strategy
	app.get(
		'/auth/google/',
		passport.authenticate('google', {
			// what access to ask from google about user
			scope: ['profile', 'email'],
		})
	);
	app.get('/auth/google/callback', passport.authenticate('google'), function(req, res) {
		res.redirect('/workouts');
	});

	// facebook strategy
	//requires ssl on heroku
	// app.get('/auth/facebook/', passport.authenticate('facebook'));
	// app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(
	// 	req,
	// 	res
	// ) {
	// 	res.redirect('/');
	// });

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		console.log(req.user);
		res.send(req.user);
	});
};
