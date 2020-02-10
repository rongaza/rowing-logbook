import moment from 'moment';

const reducer = (acc, obj) => acc + obj.distance;
export const lifetimeMeters = workouts => {
	return workouts.reduce(reducer, 0);
};

export const seasonMeters = workouts => {
	let year = moment().format('YYYY');
	const season = workouts.filter(workout => {
		return moment(workout.date).format('YYYY') === year;
	});
	return season.reduce(reducer, 0);
};
