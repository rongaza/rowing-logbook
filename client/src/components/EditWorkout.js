import React from 'react';
import WorkoutForm from './WorkoutForm';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

const EditWorkout = ({ workout, editWorkout, deleteWorkout }) => {
	return (
		<Container className="mt-5">
			<h2>Edit Workout</h2>
			<WorkoutForm workout={workout} onSubmit={editWorkout} deleteWorkout={deleteWorkout} />
		</Container>
	);
};

const mapStateToProps = (state, props) => {
	const workout = state.workouts.find(workout => workout._id === props.match.params.id);

	return {
		workout,
	};
};

export default connect(mapStateToProps, actions)(EditWorkout);
