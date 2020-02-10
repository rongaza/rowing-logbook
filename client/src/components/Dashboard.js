import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, CardDeck } from 'react-bootstrap';
import * as actions from '../actions';
import ListWorkouts from './ListWorkouts';
import WorkoutForm from './WorkoutForm';
import DisplayCard from './DisplayCard';
import moment from 'moment';
import { lifetimeMeters, seasonMeters } from '../utils';

const Dashboard = ({ addWorkout, deleteWorkout, workouts }) => {
	return (
		<div className="mx-5">
			<Row className="pt-5">
				<Col sm={8}>
					<WorkoutForm onSubmit={addWorkout} />
				</Col>
				<Col>
					<CardDeck>
						<DisplayCard
							title={'Lifetime Meters'}
							distance={lifetimeMeters(workouts)}
						/>
						<DisplayCard
							title={`${moment().format('YYYY')} Season Meters`}
							distance={seasonMeters(workouts)}
						/>
					</CardDeck>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col sm={8}>
					<ListWorkouts workouts={workouts} />
				</Col>
			</Row>
		</div>
	);
};

const mapStateToProps = ({ workouts }) => {
	return {
		workouts,
	};
};

export default connect(mapStateToProps, actions)(Dashboard);
