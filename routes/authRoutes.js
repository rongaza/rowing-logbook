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
	app.get('/auth/google/callback', passport.authenticate('google'));

	// facebook strategy
	app.get('/auth/facebook/', passport.authenticate('facebook'));
	app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), function(
		req,
		res
	) {
		res.redirect('/api/current_user');
	});

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
