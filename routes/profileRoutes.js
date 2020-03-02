const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('users');

module.exports = app => {
	app.get('/api/profile', requireLogin, async (req, res) => {
		try {
			const profile = await User.find({ _id: req.user.id });
			res.send(profile);
		} catch (error) {
			res.status(503).send(error);
		}
	});
	app.put('/api/account/profile', requireLogin, async (req, res) => {
		try {
			const { email, firstName, lastName, gender, height, weight, birthday, location } = req.body;
			const updatedProfile = await User.findByIdAndUpdate(
				{ _id: req.user.id },
				{
					profile: {
						email,
						firstName,
						lastName,
						gender,
						height,
						weight,
						birthday,
						location,
					},
				},
				{
					new: true,
					useFindAndModify: false,
				}
			);
			await updatedProfile.save();
			// console.log('sending: ', updatedProfile);
			res.send(updatedProfile.profile);
		} catch (error) {
			res.send(error);
		}
	});
};
