const mongoose = require('mongoose');
const { Schema } = mongoose;
const FistbumpSchema = require('./Fistbump');

const workoutSchema = new Schema({
	date: String,
	type: String,
	distance: Number,
	time: {
		hours: Number,
		mins: Number,
		secs: Number,
		tenths: Number,
		totalSeconds: Number,
	},
	weightClass: String,
	notes: String,
	fistbumps: [FistbumpSchema],
	// reference field to user schema
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('workouts', workoutSchema);
