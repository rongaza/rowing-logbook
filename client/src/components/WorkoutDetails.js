import React from 'react';
import { connect } from 'react-redux';
import { convertTimeDisplay } from '../utils/index';

const WorkoutDetails = ({ workout }) => {
	const pace = () => {
		return 500 * (workout.time.totalSeconds / workout.distance);
	};

	const watts = () => {
		return 2.8 / Math.pow(pace() / 500, 3);
	};
	return (
		<div>
			Workout Details
			<p>Meters - {workout.distance}</p>
			<p>Time - {convertTimeDisplay(workout.time.totalSeconds)}</p>
			<p>Pace = {convertTimeDisplay(pace())}</p>
			<p>Watts = {watts()}</p>
		</div>
	);
};

const mapStateToProps = (state, props) => {
	const workout = state.workouts.find(workout => workout._id === props.match.params.id);

	return {
		workout,
	};
};
export default connect(mapStateToProps)(WorkoutDetails);

// distance = (time/split) * 500
// split = 500 * (time/distance)
// time = split * (distance/500)
// watts = 2.8/(split/500)³
