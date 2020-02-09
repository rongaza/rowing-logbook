const mongoose = require('mongoose');
const { Schema } = mongoose;

const fistbumpSchema = new Schema({
	id: String,
});

module.exports = fistbumpSchema;
