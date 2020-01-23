import React from 'react';
import { connect } from 'react-redux';
import WorkoutForm from './WorkoutForm';

const EditWorkout = props => {
	console.log(props.workout);
	return (
		<React.Fragment>
			<h2>Edit Workout</h2>
		</React.Fragment>
	);
};

const mapStateToProps = (state, props) => {
	const workout = state.workouts.find(workout => workout._id === props.match.params.id);
	console.log(workout);
	return {
		workout,
	};
};

export default connect(mapStateToProps)(EditWorkout);
