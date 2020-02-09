const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Workout = mongoose.model('workouts');

module.exports = app => {
	app.get('/api/workouts', requireLogin, async (req, res) => {
		const workouts = await Workout.find({ _user: req.user.id });
		res.send(workouts);
	});

	app.post('/api/workouts', requireLogin, async (req, res) => {
		const { date, type, distance, time, weightClass, notes } = req.body;
		const workout = new Workout({
			date,
			type,
			distance,
			time,
			weightClass,
			notes,
			_user: req.user.id,
		});

		try {
			await workout.save();
			res.send(workout);
		} catch (error) {
			res.status(422).send(error);
		}
	});

	app.put('/api/workouts', requireLogin, async (req, res) => {
		// console.log('update workout route');
		// console.log(req.body);
		// const { _id, date, type, distance, time, weightClass, notes } = req.body;
		const updatedWorkout = await Workout.findByIdAndUpdate({ _id: req.body.id }, { ...req.body });

		try {
			await updatedWorkout.save();
			res.send(updatedWorkout);
		} catch (error) {
			res.status(422).send(error);
		}
	});
};
