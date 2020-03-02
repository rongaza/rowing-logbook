import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

const Pagination = ({ workoutsPerPage, totalWorkouts, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalWorkouts) / workoutsPerPage; i++) {
		// gets correct amount of page numbers
		pageNumbers.push(i);
	}
	return (
		<Nav>
			<ul className="pagination">
				{pageNumbers.map(number => (
					// user router Link to={/workouts}
					<li key={number} className="page-item">
						<Link to={'/workouts'}>
							<p onClick={() => paginate(number)} className="page-link">
								{number}
							</p>
						</Link>
					</li>
				))}
			</ul>
		</Nav>
	);
};

export default Pagination;
