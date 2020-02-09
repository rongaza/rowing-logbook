import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import moment from 'moment';

const ListWorkouts = ({ workouts }) => {
	const sortedWorkouts = workouts.sort((a, b) => {
		return moment(b.date) - moment(a.date);
	});

	const renderWorkoutList = () => {
		if (workouts.length > 0) {
			return sortedWorkouts.map(workout => {
				const { _id, date, distance, time, type, notes } = workout;
				return (
					<tr key={_id}>
						<td>
							<Link to={`/workouts/edit/${_id}`}>
								{moment(date).format('MM/DD/YYYY')}
							</Link>
						</td>

						<td>{type}</td>
						<td>{distance}</td>
						<td>{time}</td>
						<td>{notes}</td>
					</tr>
				);
			});
		} else {
			return <tr></tr>;
		}
	};

	return (
		<div>
			<h2>Workout List</h2>

			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Date</th>
						<th>Type</th>
						<th>Distance</th>
						<th>Time</th>
						<th>Notes</th>
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
