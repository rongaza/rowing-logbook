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

export const convertTimeDisplay = totalSeconds => {
	let time = String(totalSeconds).split('.');
	let secs = time[0];
	let tenths = time[1] !== undefined ? time[1] : 0;

	let h = Math.floor(secs / 3600);
	let m = Math.floor((secs % 3600) / 60);
	let s = Math.floor((secs % 3600) % 60);

	const hDisplay = h !== 0 ? `${h}` : '0';
	const mDisplay = m !== 0 ? `${m}` : '0';
	const sDisplay = s !== 0 ? `${s}` : '0';
	const tDisplay = tenths !== undefined ? `${tenths}` : '0';
	return `${hDisplay}:${mDisplay}:${sDisplay}.${tDisplay}`;
	// return {
	// 	hours: h,
	// 	minutes: m,
	// 	secs: s,
	// 	tenths: tenths,
	// };
};

export const sortedWorkoutsByDate = (workouts, order = 'desc') => {
	return workouts.sort((a, b) => {
		if (order === 'desc') {
			return moment(b.date) - moment(a.date);
		} else {
			return moment(a.date) - moment(b.date);
		}
	});
};

export const sortWorkoutsByTime = (workouts, order = 'asc') => {
	return workouts.sort((a, b) => {
		if (order === 'asc') {
			return a.time.totalSeconds - b.time.totalSeconds;
		} else {
			return b.time.totalSeconds - a.time.totalSeconds;
		}
	});
};

export const last30DaysWorkouts = workouts => {
	// const month = moment().format('M');
	const today = moment.now();
	const start = moment(today).subtract(30, 'days');

	const data = workouts.filter(workout => {
		return moment(workout.date).isBetween(start, today);
	});
	return sortedWorkoutsByDate(data, 'asc');
};

export const getRankedWorkout = (workouts, distance) => {
	let workoutData = workouts.filter(workout => {
		return workout.distance === distance;
	});
	return sortWorkoutsByTime(workoutData, 'asc')[0];
};
