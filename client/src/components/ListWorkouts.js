import React, { useState } from 'react';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import moment from 'moment';
import { convertTimeDisplay, sortedWorkoutsByDate } from '../utils';

const ListWorkouts = ({ workouts }) => {
	const [workoutList] = useState(sortedWorkoutsByDate(workouts));
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	// Get current posts
	const indexOfLastWorkout = currentPage * postsPerPage;
	const indexOfFirstWorkout = indexOfLastWorkout - postsPerPage;
	const currentWorkouts = workoutList.slice(indexOfFirstWorkout, indexOfLastWorkout);

	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber);

	const renderWorkoutList = () => {
		if (currentWorkouts.length > 0) {
			return currentWorkouts.map(workout => {
				const { _id, date, distance, time, type, notes } = workout;
				// const { hours, minutes, secs, tenths } = convertTimeDisplay(time.totalSeconds);
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
			<Pagination
				workoutsPerPage={postsPerPage}
				totalWorkouts={workouts.length}
				paginate={paginate}
			/>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		workouts: state.workouts,
	};
};
export default connect(mapStateToProps)(ListWorkouts);
