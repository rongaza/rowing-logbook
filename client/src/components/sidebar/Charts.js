import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { connect } from 'react-redux';
import moment from 'moment';
import { last30DaysWorkouts } from '../../utils/index';

const Charts = ({ workouts }) => {
	const dateFormat = date => {
		return moment(date).format('M/D');
	};
	return (
		<div className="mt-3 ">
			Last 30 Days
			<LineChart
				className="mt-3"
				width={400}
				height={250}
				data={last30DaysWorkouts(workouts)}
				margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<Legend />
				<XAxis dataKey="date" tickFormatter={dateFormat} />
				<YAxis dataKey="distance" />
				<Line type="monotone" dataKey="distance" />
			</LineChart>
		</div>
	);
};

const mapStateToProps = ({ workouts }) => {
	return {
		workouts,
	};
};

export default connect(mapStateToProps)(Charts);
