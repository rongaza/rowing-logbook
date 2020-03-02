import React from 'react';
import { sortWorkoutsByTime, convertTimeDisplay } from '../../utils/index';
import { connect } from 'react-redux';
import { Table, Col } from 'react-bootstrap';
import moment from 'moment';

const RankedWorkouts = ({ workouts }) => {
	const rankedDistances = [100, 500, 1000, 2000, 5000, 6000, 10000, 21097, 42195];
	const rankedWorkouts = [];
	const allRankedWorkouts = workouts.filter(workout => rankedDistances.includes(workout.distance) === true);

	// const ranked100m = () => {
	// 	const workouts = allRankedWorkouts.filter(workout => workout.distance === 100);
	// 	return sortWorkoutsByTime(workouts)[0];
	// };

	// const ranked500m = () => {
	// 	const workouts = allRankedWorkouts.filter(workout => workout.distance === 500);
	// 	return sortWorkoutsByTime(workouts)[0];
	// };

	const populateRankedWorkouts = () => {
		rankedDistances.forEach(distance => {
			const workouts = allRankedWorkouts.filter(workout => workout.distance === distance);

			if (workouts.length > 0) {
				let workout = sortWorkoutsByTime(workouts)[0];
				rankedWorkouts.push(workout);
			}
		});
	};

	const renderWorkoutList = () => {
		populateRankedWorkouts();
		return rankedWorkouts.map(workout => {
			return (
				<tr key={workout._id}>
					<td>{workout.distance}m</td>
					<td>{convertTimeDisplay(workout.time.totalSeconds)}</td>
					<td>{moment(workout.date).format('M/D/YY')}</td>
				</tr>
			);
		});
	};

	return (
		<Col className="px-5">
			<h2>Ranked Workouts</h2>
			<Table striped bordered hover size="sm" borderless="true">
				<thead>
					<tr>
						<th>Distance</th>
						<th>Time</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>{renderWorkoutList()}</tbody>
			</Table>
		</Col>
	);
};

const mapStateToProps = ({ workouts }) => {
	return {
		workouts,
	};
};
export default connect(mapStateToProps)(RankedWorkouts);
