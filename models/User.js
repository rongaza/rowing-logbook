const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	googleID: String,
	facebookID: String,
	userName: String,
	profile: {
		email: String,
		firstName: String,
		lastName: String,
		birthday: Date,
		gender: String,
		height: Number,
		weight: Number,
		location: {
			state: String,
			city: String,
		},
	},
});

mongoose.model('users', userSchema);
