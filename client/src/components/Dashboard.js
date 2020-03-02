import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import * as actions from '../actions';
import ListWorkouts from './ListWorkouts';
import WorkoutForm from './WorkoutForm';
import DisplayCard from './sidebar/DisplayCard';
import RankedWorkouts from './sidebar/RankedWorkouts';
import Charts from './sidebar/Charts';
import moment from 'moment';
import { lifetimeMeters, seasonMeters } from '../utils';

const Dashboard = ({ addWorkout, workouts }) => {
	return (
		<div className="mx-5">
			<Row className="mb-3 pt-5">
				<Col lg={8} className="pr-5">
					<Row>
						<WorkoutForm onSubmit={addWorkout} />
					</Row>
				</Col>
				<Col md={4}>
					<Row>
						<Col>
							<DisplayCard
								title={'Lifetime Meters'}
								distance={lifetimeMeters(workouts)}
							/>
						</Col>
						<Col>
							<DisplayCard
								title={`${moment().format('YYYY')} Meters`}
								distance={seasonMeters(workouts)}
							/>
						</Col>
					</Row>
					<Row>
						<Charts />
					</Row>
				</Col>
			</Row>
			<Row className="mt-5 ">
				<Col lg={8} className="pr-5">
					<ListWorkouts workouts={workouts} />
				</Col>
				<Col>
					<RankedWorkouts />
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
