import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { convertTimeDisplay, sortedWorkoutsByDate } from '../utils';

const ListWorkouts = ({ workouts }) => {
	const sortedWorkouts = sortedWorkoutsByDate(workouts);

	// distance = (time/split) * 500
	// split = 500 * (time/distance)
	// time = split * (distance/500)
	// watts = 2.8/(split/500)³

	const renderWorkoutList = () => {
		if (workouts.length > 0) {
			return sortedWorkouts.map(workout => {
				const { _id, date, distance, time, type, notes } = workout;
				return (
					<tr key={_id}>
						<td>{moment(date).format('MM/DD/YYYY')}</td>

						<td>{distance}m</td>
						<td>{convertTimeDisplay(time.totalSeconds)}</td>
						<td>{type}</td>
						<td>{notes}</td>
						<td>
							<Link to={`/workouts/details/${_id}`}>Details</Link>/
							<Link to={`/workouts/edit/${_id}`}>Edit</Link>
						</td>
					</tr>
				);
			});
		} else {
			return <tr></tr>;
		}
	};

	return (
		<div>
			<h2>Latest Workouts</h2>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Date</th>

						<th>Distance</th>
						<th>Time</th>
						<th>Type</th>
						<th>Notes</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>{renderWorkoutList()}</tbody>
			</Table>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		workouts: state.workouts,
	};
};
export default connect(mapStateToProps)(ListWorkouts);
