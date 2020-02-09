import React from 'react';
import WorkoutForm from './WorkoutForm';
import * as actions from '../actions';
import { connect } from 'react-redux';
import moment from 'moment';

const EditWorkout = ({ workout, editWorkout }) => {
	return (
		<React.Fragment>
			<h2>Edit Workout</h2>
			<WorkoutForm workout={workout} onSubmit={editWorkout} />
		</React.Fragment>
	);
};

const mapStateToProps = (state, props) => {
	const workout = state.workouts.find(workout => workout._id === props.match.params.id);

	return {
		workout,
	};
};

export default connect(mapStateToProps, actions)(EditWorkout);
