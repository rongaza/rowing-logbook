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
		<div className="mt-5 ">
			<h3 className="text-center">Last 30 Days</h3>
			<LineChart
				className="mt-3 text-center"
				width={400}
				height={250}
				data={last30DaysWorkouts(workouts)}
				margin={{ top: 5, right: 5, left: 7, bottom: 5 }}
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
