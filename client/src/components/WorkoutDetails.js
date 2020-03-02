import React from 'react';
import { connect } from 'react-redux';
import { convertTimeDisplay } from '../utils/index';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

const WorkoutDetails = ({ workout }) => {
	const pace = () => {
		return 500 * (workout.time.totalSeconds / workout.distance);
	};

	const watts = () => {
		return 2.8 / Math.pow(pace() / 500, 3);
	};
	return (
		<Container className="mt-5">
			<Row>
				<Col sm={4}>
					<Row>
						<h1>Workout Details</h1>
						<h3>{moment(workout.date).format('MMM d, YYYY')}</h3>
					</Row>
					<Row className="py-3">
						<FontAwesomeIcon icon="road" size="2x" className="mr-2" />
						<span>
							<b>Distance:</b> {workout.distance} meters
						</span>
					</Row>
					<Row className="py-3">
						<FontAwesomeIcon icon="clock" size="2x" className="mr-2" />
						<span>
							<b>Time:</b> {convertTimeDisplay(workout.time.totalSeconds)}
						</span>
					</Row>
					<Row className="py-3">
						<FontAwesomeIcon icon="tachometer-alt" size="2x" className="mr-2" />
						<span>
							<b>Pace:</b> {convertTimeDisplay(pace())}
						</span>
					</Row>
					<Row className="py-3">
						<FontAwesomeIcon icon="battery-half" size="2x" className="mr-2" />
						<span>
							<b>Watts:</b> {watts()}
						</span>
					</Row>
					<Row>
						<ButtonToolbar>
							<ButtonGroup className="mr-2">
								<Link to={`/workouts/edit/${workout._id}`}>
									<Button variant="primary">Edit Details</Button>
								</Link>
							</ButtonGroup>
							<ButtonGroup className="mr-2">
								<Link to={'/workouts'}>
									<Button variant="secondary">
										Return to Dashboard
									</Button>
								</Link>
							</ButtonGroup>
						</ButtonToolbar>
					</Row>
				</Col>
			</Row>
		</Container>
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
