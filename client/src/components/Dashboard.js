import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, CardDeck } from 'react-bootstrap';
import { Container, Button } from 'react-floating-action-button';

import ListWorkouts from './ListWorkouts';
import WorkoutForm from './WorkoutForm';
import DisplayCard from './DisplayCard';

const Dashboard = ({ fetchWorkouts, workouts }) => {
	const reducer = (acc, obj) => acc + obj.distance;
	const lifetimeMeters = () => {
		return workouts.reduce(reducer, 0);
	};

	return (
		<div className="mx-5">
			<Row className="pt-5">
				<Col sm={8}>
					<WorkoutForm />
				</Col>
				<Col>
					<CardDeck>
						<DisplayCard title={'Lifetime Meters'} distance={lifetimeMeters()} />
						<DisplayCard title={'Season Meters'} distance={10033} />
					</CardDeck>
				</Col>
			</Row>
			<Row className="mt-5">
				<Col sm={8}>
					<ListWorkouts workouts={workouts} />
				</Col>
			</Row>
			<Container>
				<Link to="/workouts/new" style={{ textDecoration: 'none' }}>
					<Button
						tooltip="The big plus button!"
						icon="fas fa-plus"
						rotate={true}
						// onClick={() => alert('FAB Rocks!')}
					/>
				</Link>
			</Container>
		</div>
	);
};

const mapStateToProps = ({ workouts }) => {
	return {
		workouts,
	};
};

export default connect(mapStateToProps)(Dashboard);
