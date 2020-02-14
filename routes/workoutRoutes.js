const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Workout = mongoose.model('workouts');

module.exports = app => {
	app.get('/api/workouts', requireLogin, async (req, res) => {
		try {
			const workouts = await Workout.find({ _user: req.user.id });
			res.send(workouts);
		} catch (error) {
			res.status(503).send(error);
		}
	});

	app.post('/api/workouts', requireLogin, async (req, res) => {
		try {
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
			await workout.save();
			res.send(workout);
		} catch (error) {
			res.status(422).send(error);
		}
	});

	app.put('/api/workouts', requireLogin, async (req, res) => {
		try {
			const updatedWorkout = await Workout.findByIdAndUpdate(
				{ _id: req.body._id },
				{ ...req.body },
				{
					new: true,
					useFindAndModify: false,
				}
			);
			await updatedWorkout.save();
			res.send(updatedWorkout);
		} catch (error) {
			res.status(422).send(error);
		}
	});

	app.delete('/api/workouts', requireLogin, async (req, res) => {
		try {
			const workout = await Workout.findOneAndDelete({ _id: req.body.id });
			res.send(workout);
		} catch (error) {
			console.log(error);
		}
	});
};
